import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { cache } from '../config/redis';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // TODO: Fetch user from database
    // For now, using demo credentials
    if (email !== 'demo@tvmenudesigner.com' || password !== 'demo123456') {
      throw new AppError('Invalid credentials', 401);
    }

    const user = {
      id: uuidv4(),
      email,
      firstName: 'Demo',
      lastName: 'User',
      role: 'organization_owner' as const,
      organizationId: uuidv4()
    };

    // Generate tokens
    const token = jwt.sign(
      { userId: user.id, organizationId: user.organizationId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    // Cache user data
    await cache.set(`user:${user.id}`, user, 3600); // 1 hour

    res.json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    throw error;
  }
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName, organizationName } = req.body;

  try {
    // TODO: Check if user exists in database
    // TODO: Create organization
    // TODO: Create user

    const organizationId = uuidv4();
    const userId = uuidv4();

    const user = {
      id: userId,
      email,
      firstName,
      lastName,
      role: 'organization_owner' as const,
      organizationId
    };

    // Generate tokens
    const token = jwt.sign(
      { userId: user.id, organizationId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    // Cache user data
    await cache.set(`user:${user.id}`, user, 3600);

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    throw error;
  }
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;

    // TODO: Fetch user from database
    const user = await cache.get(`user:${decoded.userId}`);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    // Generate new access token
    const token = jwt.sign(
      { userId: decoded.userId, organizationId: (user as any).organizationId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    res.json({
      success: true,
      data: { token }
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    throw new AppError('Invalid refresh token', 401);
  }
}

export async function logout(req: AuthRequest, res: Response) {
  try {
    // Blacklist the token
    if (req.token) {
      const decoded = jwt.decode(req.token) as any;
      const ttl = decoded.exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) {
        await cache.set(`blacklist:${req.token}`, true, ttl);
      }
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    throw error;
  }
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  res.json({
    success: true,
    data: { user: req.user }
  });
}