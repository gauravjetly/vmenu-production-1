import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger';

export function setupMenuHandlers(io: Server, socket: Socket) {
  // Menu update notification
  socket.on('menu:update', async (data: any) => {
    try {
      const { menuId, deviceIds } = data;
      
      // Notify specific devices or all organization devices
      if (deviceIds && deviceIds.length > 0) {
        deviceIds.forEach((deviceId: string) => {
          io.to(`device:${deviceId}`).emit('menu:refresh', { menuId });
        });
      } else {
        io.to(`org:${(socket as any).organizationId}`).emit('menu:refresh', { menuId });
      }
    } catch (error) {
      logger.error('Menu update notification error:', error);
    }
  });

  // Collaborative editing
  socket.on('menu:edit', async (data: any) => {
    try {
      const { menuId, changes, userId } = data;
      
      // Broadcast changes to other editors
      socket.to(`menu:${menuId}`).emit('menu:changes', {
        changes,
        userId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Menu collaborative edit error:', error);
    }
  });

  // Join menu editing session
  socket.on('menu:join', async (data: any) => {
    try {
      const { menuId } = data;
      socket.join(`menu:${menuId}`);
      
      // Notify other editors
      socket.to(`menu:${menuId}`).emit('menu:userJoined', {
        userId: (socket as any).user?.id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Menu join error:', error);
    }
  });

  // Leave menu editing session
  socket.on('menu:leave', async (data: any) => {
    try {
      const { menuId } = data;
      socket.leave(`menu:${menuId}`);
      
      // Notify other editors
      socket.to(`menu:${menuId}`).emit('menu:userLeft', {
        userId: (socket as any).user?.id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Menu leave error:', error);
    }
  });
}