import { Express } from 'express';
import { authRoutes } from './auth.routes';
import { organizationRoutes } from './organization.routes';
import { userRoutes } from './user.routes';
import { menuRoutes } from './menu.routes';
import { deviceRoutes } from './device.routes';
import { analyticsRoutes } from './analytics.routes';
import { uploadRoutes } from './upload.routes';

export function setupRoutes(app: Express) {
  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/menus', menuRoutes);
  app.use('/api/devices', deviceRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/upload', uploadRoutes);
}