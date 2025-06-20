"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWithCorrelationId = exports.loggerImpl = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const async_hooks_1 = require("async_hooks");
// AsyncLocalStorage for correlation ID tracking
const asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
/**
 * Logger Implementation
 * Provides structured logging with correlation ID support
 */
class LoggerImpl {
    winston;
    constructor() {
        const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }), winston_1.default.format.json());
        const transports = [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.printf((info) => {
                    const { level, message, timestamp, ...metadata } = info;
                    const correlationId = this.getCorrelationId();
                    const metaStr = Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : '';
                    const corrId = correlationId ? `[${correlationId}] ` : '';
                    return `${timestamp} ${corrId}${level}: ${message} ${metaStr}`;
                }))
            })
        ];
        // Add file transport in production
        if (config_1.config.isProduction) {
            transports.push(new winston_1.default.transports.File({
                filename: path_1.default.join(process.cwd(), config_1.config.logging.file),
                maxsize: 10485760, // 10MB
                maxFiles: 5,
                format: logFormat
            }));
        }
        this.winston = winston_1.default.createLogger({
            level: config_1.config.logging.level,
            format: logFormat,
            transports,
            exitOnError: false
        });
    }
    info(message, meta) {
        this.winston.info(message, this.enrichMetadata(meta));
    }
    warn(message, meta) {
        this.winston.warn(message, this.enrichMetadata(meta));
    }
    error(message, error, meta) {
        this.winston.error(message, this.enrichMetadata({
            ...meta,
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name
            }
        }));
    }
    debug(message, meta) {
        this.winston.debug(message, this.enrichMetadata(meta));
    }
    setCorrelationId(correlationId) {
        const store = asyncLocalStorage.getStore();
        if (store) {
            store.correlationId = correlationId;
        }
    }
    getCorrelationId() {
        const store = asyncLocalStorage.getStore();
        return store?.correlationId;
    }
    /**
     * Run a function with a correlation ID context
     */
    static runWithCorrelationId(correlationId, fn) {
        return asyncLocalStorage.run({ correlationId }, fn);
    }
    enrichMetadata(meta) {
        const correlationId = this.getCorrelationId();
        return {
            ...meta,
            correlationId
        };
    }
}
// Export singleton instance
exports.loggerImpl = new LoggerImpl();
// Export the static method for running with correlation ID
exports.runWithCorrelationId = LoggerImpl.runWithCorrelationId;
//# sourceMappingURL=LoggerImpl.js.map