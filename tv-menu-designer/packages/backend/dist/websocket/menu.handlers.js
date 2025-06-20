"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMenuHandlers = setupMenuHandlers;
const logger_1 = require("../utils/logger");
function setupMenuHandlers(io, socket) {
    // Menu update notification
    socket.on('menu:update', async (data) => {
        try {
            const { menuId, deviceIds } = data;
            // Notify specific devices or all organization devices
            if (deviceIds && deviceIds.length > 0) {
                deviceIds.forEach((deviceId) => {
                    io.to(`device:${deviceId}`).emit('menu:refresh', { menuId });
                });
            }
            else {
                io.to(`org:${socket.data.organizationId}`).emit('menu:refresh', { menuId });
            }
        }
        catch (error) {
            logger_1.logger.error('Menu update notification error:', error);
        }
    });
    // Collaborative editing
    socket.on('menu:edit', async (data) => {
        try {
            const { menuId, changes, userId } = data;
            // Broadcast changes to other editors
            socket.to(`menu:${menuId}`).emit('menu:changes', {
                changes,
                userId,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            logger_1.logger.error('Menu collaborative edit error:', error);
        }
    });
    // Join menu editing session
    socket.on('menu:join', async (data) => {
        try {
            const { menuId } = data;
            socket.join(`menu:${menuId}`);
            // Notify other editors
            socket.to(`menu:${menuId}`).emit('menu:userJoined', {
                userId: socket.data.user?.id,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            logger_1.logger.error('Menu join error:', error);
        }
    });
    // Leave menu editing session
    socket.on('menu:leave', async (data) => {
        try {
            const { menuId } = data;
            socket.leave(`menu:${menuId}`);
            // Notify other editors
            socket.to(`menu:${menuId}`).emit('menu:userLeft', {
                userId: socket.data.user?.id,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            logger_1.logger.error('Menu leave error:', error);
        }
    });
}
//# sourceMappingURL=menu.handlers.js.map