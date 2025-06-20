"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const correlationId_1 = require("./middleware/correlationId");
const routes_1 = require("./routes");
const websocket_1 = require("./websocket");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: config_1.config.cors.origins,
        credentials: true
    }
});
// Middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.config.cors.origins,
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Add correlation ID middleware before logging
app.use(correlationId_1.correlationIdMiddleware);
app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_1.logger.info(message.trim()) } }));
// Serve uploaded files
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// Rate limiting
app.use('/api', rateLimiter_1.rateLimiter);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// Routes
(0, routes_1.setupRoutes)(app);
// Error handlers
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start server
async function start() {
    try {
        // Initialize database
        await (0, database_1.initializeDatabase)();
        logger_1.logger.info('Database initialized');
        // Initialize Redis
        await (0, redis_1.initializeRedis)();
        logger_1.logger.info('Redis initialized');
        // Setup WebSocket after Redis is initialized
        (0, websocket_1.setupWebSocket)(io);
        // Start HTTP server
        httpServer.listen(config_1.config.server.port, config_1.config.server.host, () => {
            logger_1.logger.info(`Server running at http://${config_1.config.server.host}:${config_1.config.server.port}`);
            logger_1.logger.info(`WebSocket server running on port ${config_1.config.server.port}`);
            logger_1.logger.info(`Environment: ${config_1.config.env}`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Handle graceful shutdown
process.on('SIGTERM', async () => {
    logger_1.logger.info('SIGTERM received, shutting down gracefully');
    httpServer.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
});
start();
//# sourceMappingURL=index.js.map