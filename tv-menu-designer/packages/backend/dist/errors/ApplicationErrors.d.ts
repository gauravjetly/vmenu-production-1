/**
 * Base Application Error
 * All custom errors should extend from this
 */
export declare abstract class ApplicationError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(message: string, code: string, statusCode: number, isOperational?: boolean);
}
/**
 * Validation Error
 * Used when input validation fails
 */
export declare class ValidationError extends ApplicationError {
    constructor(message: string, details?: any);
    details?: any;
}
/**
 * Not Found Error
 * Used when a requested resource doesn't exist
 */
export declare class NotFoundError extends ApplicationError {
    constructor(message: string);
}
/**
 * Unauthorized Error
 * Used when user lacks permission for an operation
 */
export declare class UnauthorizedError extends ApplicationError {
    constructor(message?: string);
}
/**
 * Forbidden Error
 * Used when user is authenticated but lacks specific permissions
 */
export declare class ForbiddenError extends ApplicationError {
    constructor(message?: string);
}
/**
 * Conflict Error
 * Used when there's a conflict with current state
 */
export declare class ConflictError extends ApplicationError {
    constructor(message: string);
}
/**
 * Business Rule Violation Error
 * Used when a business rule is violated
 */
export declare class BusinessRuleError extends ApplicationError {
    constructor(message: string);
}
/**
 * External Service Error
 * Used when an external service fails
 */
export declare class ExternalServiceError extends ApplicationError {
    constructor(message: string, service: string);
    service: string;
}
/**
 * Rate Limit Error
 * Used when rate limits are exceeded
 */
export declare class RateLimitError extends ApplicationError {
    constructor(message?: string);
}
//# sourceMappingURL=ApplicationErrors.d.ts.map