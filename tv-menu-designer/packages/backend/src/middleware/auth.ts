import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './errorHandler';
import { cache } from '../config/redis';
import { AuthUser } from '../types/auth';

export interface AuthRequest extends Request {
  user?: AuthUser;
  token?: string;
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.substring(7);

    // Check if token is blacklisted
    const isBlacklisted = await cache.exists(`blacklist:${token}`);
    if (isBlacklisted) {
      throw new AppError('Token is invalid', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as any;

    // Get user from cache or database
    let user = await cache.get<AuthUser>(`user:${decoded.userId}`);
    if (!user) {
      // Fetch from database
      const { User: UserModel } = await import('../models/User');
      const dbUser = await UserModel.query().findById(decoded.userId);
      
      if (!dbUser || dbUser.status !== 'active') {
        throw new AppError('User not found or inactive', 401);
      }
      
      user = {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        role: dbUser.role,
        organizationId: dbUser.organizationId,
        permissions: dbUser.permissions
      };
      
      // Cache for next time
      await cache.set(`user:${decoded.userId}`, user, 3600);
    }

    // Attach user and token to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401));
    } else {
      next(error);
    }
  }
}

export function authorize(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }

    next();
  };
}

export function requirePermission(permission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    // Super admin has all permissions
    if (req.user.role === 'super_admin') {
      return next();
    }

    // Check if user has the required permission
    if (!req.user.permissions.includes(permission as any)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
}