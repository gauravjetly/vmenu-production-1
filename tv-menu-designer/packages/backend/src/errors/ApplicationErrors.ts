/**
 * Base Application Error
 * All custom errors should extend from this
 */
export abstract class ApplicationError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, code: string, statusCode: number, isOperational = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this);
  }
}

/**
 * Validation Error
 * Used when input validation fails
 */
export class ValidationError extends ApplicationError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400);
    this.details = details;
  }

  public details?: any;
}

/**
 * Not Found Error
 * Used when a requested resource doesn't exist
 */
export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

/**
 * Unauthorized Error
 * Used when user lacks permission for an operation
 */
export class UnauthorizedError extends ApplicationError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

/**
 * Forbidden Error
 * Used when user is authenticated but lacks specific permissions
 */
export class ForbiddenError extends ApplicationError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}

/**
 * Conflict Error
 * Used when there's a conflict with current state
 */
export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}

/**
 * Business Rule Violation Error
 * Used when a business rule is violated
 */
export class BusinessRuleError extends ApplicationError {
  constructor(message: string) {
    super(message, 'BUSINESS_RULE_VIOLATION', 422);
  }
}

/**
 * External Service Error
 * Used when an external service fails
 */
export class ExternalServiceError extends ApplicationError {
  constructor(message: string, service: string) {
    super(message, 'EXTERNAL_SERVICE_ERROR', 503);
    this.service = service;
  }

  public service: string;
}

/**
 * Rate Limit Error
 * Used when rate limits are exceeded
 */
export class RateLimitError extends ApplicationError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
  }
}