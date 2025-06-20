"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
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
function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors = null;
    // Log error
    logger_1.logger.error({
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip
    });
    // Handle different error types
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }));
    }
    else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        errors,
        ...(config_1.config.isDevelopment && { stack: err.stack })
    });
}
//# sourceMappingURL=errorHandler.js.map