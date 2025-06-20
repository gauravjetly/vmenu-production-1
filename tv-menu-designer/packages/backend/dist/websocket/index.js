"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = setupWebSocket;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const device_handlers_1 = require("./device.handlers");
const menu_handlers_1 = require("./menu.handlers");
const redis_1 = require("../config/redis");
function setupWebSocket(io) {
    const pubClient = (0, redis_1.getPubClient)();
    const subClient = (0, redis_1.getSubClient)();
    // Enable Redis adapter for scaling
    // io.adapter(createAdapter(pubClient, subClient));
    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication required'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
            // TODO: Fetch user from database/cache
            socket.user = { id: decoded.userId };
            socket.organizationId = decoded.organizationId;
            next();
        }
        catch (error) {
            logger_1.logger.error('WebSocket authentication error:', error);
            next(new Error('Authentication failed'));
        }
    });
    io.on('connection', (socket) => {
        logger_1.logger.info(`WebSocket client connected: ${socket.id}`);
        // Join organization room
        if (socket.organizationId) {
            socket.join(`org:${socket.organizationId}`);
        }
        // Join user room for personal notifications
        if (socket.user?.id) {
            socket.join(`user:${socket.user.id}`);
        }
        // Setup handlers
        (0, device_handlers_1.setupDeviceHandlers)(io, socket);
        (0, menu_handlers_1.setupMenuHandlers)(io, socket);
        // Handle disconnection
        socket.on('disconnect', () => {
            logger_1.logger.info(`WebSocket client disconnected: ${socket.id}`);
        });
        // Handle errors
        socket.on('error', (error) => {
            logger_1.logger.error(`WebSocket error for client ${socket.id}:`, error);
        });
    });
    // Periodic ping to keep connections alive
    setInterval(() => {
        io.emit('ping', { timestamp: Date.now() });
    }, config_1.config.websocket.pingInterval);
}
//# sourceMappingURL=index.js.map