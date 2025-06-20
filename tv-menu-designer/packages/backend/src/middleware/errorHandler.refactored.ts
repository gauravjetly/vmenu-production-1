import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApplicationError } from '../errors/ApplicationErrors';
import { MenuValidationError, MenuBusinessError } from '../domain/menu/MenuDomain';
import { config } from '../config';
import { getLogger } from '../container/DIContainer';

const logger = getLogger();

/**
 * Enhanced Error Handler Middleware
 * Handles all types of errors with proper logging and response formatting
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = 'Internal Server Error';
  let code = 'INTERNAL_ERROR';
  let details: any;

  // Handle different error types
  if (err instanceof ApplicationError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    
    if ('details' in err) {
      details = (err as any).details;
    }
  } else if (err instanceof MenuValidationError) {
    statusCode = 400;
    message = err.message;
    code = 'MENU_VALIDATION_ERROR';
  } else if (err instanceof MenuBusinessError) {
    statusCode = 422;
    message = err.message;
    code = 'MENU_BUSINESS_ERROR';
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
    details = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
  } else if (err.name === 'ValidationError') {
    // Objection.js validation error
    statusCode = 400;
    message = 'Validation failed';
    code = 'VALIDATION_ERROR';
    details = (err as any).data;
  } else if (err.name === 'NotFoundError') {
    // Objection.js not found error
    statusCode = 404;
    message = 'Resource not found';
    code = 'NOT_FOUND';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
    code = 'UNAUTHORIZED';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  }

  // Get correlation ID if available
  const correlationId = (req as any).correlationId;

  // Log error with context
  logger.error('Request failed', err, {
    statusCode,
    code,
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      correlationId
    },
    user: (req as any).user?.id
  });

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
      ...(correlationId && { correlationId }),
      ...(config.isDevelopment && !config.isProduction && { 
        stack: err.stack,
        originalError: err.message 
      })
    }
  });
}

// Keep the AppError class for backward compatibility
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}