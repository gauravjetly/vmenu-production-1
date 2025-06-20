"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.ExternalServiceError = exports.BusinessRuleError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.ApplicationError = void 0;
/**
 * Base Application Error
 * All custom errors should extend from this
 */
class ApplicationError extends Error {
    code;
    statusCode;
    isOperational;
    constructor(message, code, statusCode, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.ApplicationError = ApplicationError;
/**
 * Validation Error
 * Used when input validation fails
 */
class ValidationError extends ApplicationError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', 400);
        this.details = details;
    }
    details;
}
exports.ValidationError = ValidationError;
/**
 * Not Found Error
 * Used when a requested resource doesn't exist
 */
class NotFoundError extends ApplicationError {
    constructor(message) {
        super(message, 'NOT_FOUND', 404);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Unauthorized Error
 * Used when user lacks permission for an operation
 */
class UnauthorizedError extends ApplicationError {
    constructor(message = 'Unauthorized') {
        super(message, 'UNAUTHORIZED', 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Forbidden Error
 * Used when user is authenticated but lacks specific permissions
 */
class ForbiddenError extends ApplicationError {
    constructor(message = 'Forbidden') {
        super(message, 'FORBIDDEN', 403);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Conflict Error
 * Used when there's a conflict with current state
 */
class ConflictError extends ApplicationError {
    constructor(message) {
        super(message, 'CONFLICT', 409);
    }
}
exports.ConflictError = ConflictError;
/**
 * Business Rule Violation Error
 * Used when a business rule is violated
 */
class BusinessRuleError extends ApplicationError {
    constructor(message) {
        super(message, 'BUSINESS_RULE_VIOLATION', 422);
    }
}
exports.BusinessRuleError = BusinessRuleError;
/**
 * External Service Error
 * Used when an external service fails
 */
class ExternalServiceError extends ApplicationError {
    constructor(message, service) {
        super(message, 'EXTERNAL_SERVICE_ERROR', 503);
        this.service = service;
    }
    service;
}
exports.ExternalServiceError = ExternalServiceError;
/**
 * Rate Limit Error
 * Used when rate limits are exceeded
 */
class RateLimitError extends ApplicationError {
    constructor(message = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_EXCEEDED', 429);
    }
}
exports.RateLimitError = RateLimitError;
//# sourceMappingURL=ApplicationErrors.js.map