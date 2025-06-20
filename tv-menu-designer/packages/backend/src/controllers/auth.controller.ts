import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { cache } from '../config/redis';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { Organization } from '../models/Organization';
import { getLogger } from '../container/DIContainer';

const logger = getLogger();

export async function login(req: Request, res: Response) {
  const { email, username, password } = req.body;

  logger.info('Login attempt', { email, username, hasPassword: !!password });

  try {
    // Find user by email or username
    let user = await User.query()
      .where(function() {
        if (email) {
          this.where('email', email);
        }
        if (username) {
          this.orWhere('username', username);
        }
      })
      .first();

    if (!user) {
      logger.warn('User not found', { email, username });
      throw new AppError('Invalid credentials', 401);
    }

    logger.info('User found', { userId: user.id, email: user.email, username: user.username });

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new AppError('Account is not active', 403);
    }

    // Generate tokens
    const token = jwt.sign(
      { 
        userId: user.id, 
        organizationId: user.organizationId,
        role: user.role 
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    // Cache user data
    const userForCache = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      organizationId: user.organizationId,
      permissions: user.permissions
    };
    
    await cache.set(`user:${user.id}`, userForCache, 3600); // 1 hour

    // Update last login
    user.metadata = {
      ...user.metadata,
      lastLogin: new Date().toISOString(),
      loginCount: (user.metadata.loginCount || 0) + 1
    };
    await user.$query().patch({ metadata: user.metadata });

    logger.info('User logged in', { 
      userId: user.id, 
      email: user.email,
      organizationId: user.organizationId 
    });

    res.json({
      success: true,
      data: {
        user: userForCache,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Login error', error as Error);
    throw error;
  }
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName, organizationName } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.query().where('email', email).first();
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Create organization
    const organization = await Organization.query().insert({
      id: uuidv4(),
      name: organizationName,
      slug: organizationName.toLowerCase().replace(/\s+/g, '-'),
      plan: {
        name: 'Trial',
        features: ['basic_menus', 'single_device'],
        maxMenus: 5,
        maxDevices: 1
      },
      limits: {
        maxMenus: 5,
        maxDevices: 1,
        maxUsers: 3
      },
      status: 'trial',
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.query().insert({
      id: uuidv4(),
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'organization_owner',
      organizationId: organization.id,
      status: 'active'
    });

    // Generate tokens
    const token = jwt.sign(
      { 
        userId: user.id, 
        organizationId: user.organizationId,
        role: user.role 
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    // Cache user data
    const userForResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      organizationId: user.organizationId,
      permissions: user.permissions
    };
    
    await cache.set(`user:${user.id}`, userForResponse, 3600);

    logger.info('User registered', { 
      userId: user.id, 
      email: user.email,
      organizationId: organization.id 
    });

    res.status(201).json({
      success: true,
      data: {
        user: userForResponse,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Registration error', error as Error);
    throw error;
  }
}

export async function logout(req: AuthRequest, res: Response) {
  try {
    const token = req.token;
    if (token) {
      // Add token to blacklist
      await cache.set(`blacklist:${token}`, true, 86400); // 24 hours
      
      // Remove user from cache
      if (req.user?.id) {
        await cache.delete(`user:${req.user.id}`);
      }
    }

    logger.info('User logged out', { userId: req.user?.id });

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error', error as Error);
    throw error;
  }
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400);
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;

    // Get user from database
    const user = await User.query().findById(decoded.userId);
    if (!user || user.status !== 'active') {
      throw new AppError('Invalid refresh token', 401);
    }

    // Generate new access token
    const token = jwt.sign(
      { 
        userId: user.id, 
        organizationId: user.organizationId,
        role: user.role 
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    logger.info('Token refreshed', { userId: user.id });

    res.json({
      success: true,
      data: { token }
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid refresh token', 401);
    }
    throw error;
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  const user = req.user;

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Get organization if user has one
  let organization = null;
  if (user.organizationId) {
    organization = await Organization.query().findById(user.organizationId);
  }

  res.json({
    success: true,
    data: {
      user,
      organization
    }
  });
}