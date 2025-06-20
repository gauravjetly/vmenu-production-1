"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = correlationIdMiddleware;
const uuid_1 = require("uuid");
const LoggerImpl_1 = require("../utils/LoggerImpl");
/**
 * Correlation ID Middleware
 * Adds a unique correlation ID to each request for tracking
 */
function correlationIdMiddleware(req, res, next) {
    // Get correlation ID from header or generate new one
    const correlationId = req.headers['x-correlation-id'] || (0, uuid_1.v4)();
    // Add to request object
    req.correlationId = correlationId;
    // Add to response headers
    res.setHeader('X-Correlation-Id', correlationId);
    // Run the rest of the request handling with correlation ID context
    (0, LoggerImpl_1.runWithCorrelationId)(correlationId, () => {
        next();
    });
}
//# sourceMappingURL=correlationId.js.map