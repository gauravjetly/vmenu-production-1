import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';
import { setupDeviceHandlers } from './device.handlers';
import { setupMenuHandlers } from './menu.handlers';
import { getPubClient, getSubClient } from '../config/redis';
import { User } from '@tv-menu-designer/shared';

interface AuthenticatedSocket extends Socket {
  user?: User;
  organizationId?: string;
  deviceId?: string;
}

export function setupWebSocket(io: Server) {
  const pubClient = getPubClient();
  const subClient = getSubClient();

  // Enable Redis adapter for scaling
  // io.adapter(createAdapter(pubClient, subClient));

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, config.jwt.secret) as any;
      
      // Import cache and User model
      const { cache } = await import('../config/redis');
      const { User: UserModel } = await import('../models/User');
      
      // Get user from cache or database
      let user = await cache.get<any>(`user:${decoded.userId}`);
      if (!user) {
        // Fetch from database
        const dbUser = await UserModel.query().findById(decoded.userId);
        
        if (!dbUser || dbUser.status !== 'active') {
          return next(new Error('User not found or inactive'));
        }
        
        user = {
          id: dbUser.id,
          email: dbUser.email,
          username: dbUser.username,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          role: dbUser.role,
          organizationId: dbUser.organizationId,
          permissions: dbUser.permissions
        };
        
        // Cache for next time
        await cache.set(`user:${decoded.userId}`, user, 3600);
      }
      
      socket.user = user;
      socket.organizationId = user.organizationId;
      
      next();
    } catch (error) {
      logger.error('WebSocket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`WebSocket client connected: ${socket.id}`);

    // Join organization room
    if (socket.organizationId) {
      socket.join(`org:${socket.organizationId}`);
    }

    // Join user room for personal notifications
    if (socket.user?.id) {
      socket.join(`user:${socket.user.id}`);
    }

    // Setup handlers
    setupDeviceHandlers(io, socket);
    setupMenuHandlers(io, socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.id}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`WebSocket error for client ${socket.id}:`, error);
    });
  });

  // Periodic ping to keep connections alive
  setInterval(() => {
    io.emit('ping', { timestamp: Date.now() });
  }, config.websocket.pingInterval);
}