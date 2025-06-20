"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const ApplicationErrors_1 = require("../errors/ApplicationErrors");
const MenuDomain_1 = require("../domain/menu/MenuDomain");
const config_1 = require("../config");
const DIContainer_1 = require("../container/DIContainer");
const logger = (0, DIContainer_1.getLogger)();
/**
 * Enhanced Error Handler Middleware
 * Handles all types of errors with proper logging and response formatting
 */
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    let statusCode = 500;
    let message = 'Internal Server Error';
    let code = 'INTERNAL_ERROR';
    let details;
    // Handle different error types
    if (err instanceof ApplicationErrors_1.ApplicationError) {
        statusCode = err.statusCode;
        message = err.message;
        code = err.code;
        if ('details' in err) {
            details = err.details;
        }
    }
    else if (err instanceof MenuDomain_1.MenuValidationError) {
        statusCode = 400;
        message = err.message;
        code = 'MENU_VALIDATION_ERROR';
    }
    else if (err instanceof MenuDomain_1.MenuBusinessError) {
        statusCode = 422;
        message = err.message;
        code = 'MENU_BUSINESS_ERROR';
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        code = 'VALIDATION_ERROR';
        details = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }));
    }
    else if (err.name === 'ValidationError') {
        // Objection.js validation error
        statusCode = 400;
        message = 'Validation failed';
        code = 'VALIDATION_ERROR';
        details = err.data;
    }
    else if (err.name === 'NotFoundError') {
        // Objection.js not found error
        statusCode = 404;
        message = 'Resource not found';
        code = 'NOT_FOUND';
    }
    else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
        code = 'UNAUTHORIZED';
    }
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
        code = 'INVALID_TOKEN';
    }
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
        code = 'TOKEN_EXPIRED';
    }
    // Get correlation ID if available
    const correlationId = req.correlationId;
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
        user: req.user?.id
    });
    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(details && { details }),
            ...(correlationId && { correlationId }),
            ...(config_1.config.isDevelopment && !config_1.config.isProduction && {
                stack: err.stack,
                originalError: err.message
            })
        }
    });
}
// Keep the AppError class for backward compatibility
class AppError extends Error {
    message;
    statusCode;
    isOperational;
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=errorHandler.refactored.js.map