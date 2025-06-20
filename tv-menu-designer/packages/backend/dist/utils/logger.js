"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json());
const transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
    })
];
// Add file transport in production
if (config_1.config.isProduction) {
    transports.push(new winston_1.default.transports.File({
        filename: path_1.default.join(process.cwd(), config_1.config.logging.file),
        maxsize: 10485760, // 10MB
        maxFiles: 5
    }));
}
exports.logger = winston_1.default.createLogger({
    level: config_1.config.logging.level,
    format: logFormat,
    transports,
    exitOnError: false
});
// Create a stream object for Morgan
exports.stream = {
    write: (message) => {
        exports.logger.info(message.trim());
    }
};
//# sourceMappingURL=logger.js.map