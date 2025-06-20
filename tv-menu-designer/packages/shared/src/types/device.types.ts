import { z } from 'zod';

// Device type enum
export const DeviceTypeEnum = z.enum(['display', 'tablet', 'mobile', 'kiosk', 'web']);

// Device status enum
export const DeviceStatusEnum = z.enum(['online', 'offline', 'error', 'maintenance']);

// Device orientation enum
export const DeviceOrientationEnum = z.enum(['landscape', 'portrait', 'auto']);

// Device schema
export const DeviceSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(6).max(20), // Unique pairing code
  type: DeviceTypeEnum,
  status: DeviceStatusEnum,
  location: z.string().optional(),
  description: z.string().optional(),
  metadata: z.object({
    screenResolution: z.object({
      width: z.number().positive(),
      height: z.number().positive()
    }).optional(),
    orientation: DeviceOrientationEnum.optional(),
    browser: z.string().optional(),
    os: z.string().optional(),
    version: z.string().optional(),
    ip: z.string().optional(),
    lastSeen: z.string().datetime().optional()
  }).optional(),
  settings: z.object({
    brightness: z.number().min(0).max(100).default(100),
    volume: z.number().min(0).max(100).default(50),
    autoUpdate: z.boolean().default(true),
    sleepSchedule: z.object({
      enabled: z.boolean().default(false),
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/), // HH:MM format
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    }).optional(),
    restartSchedule: z.object({
      enabled: z.boolean().default(false),
      time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      days: z.array(z.number().min(0).max(6)) // 0 = Sunday, 6 = Saturday
    }).optional()
  }).default({}),
  assignedMenuId: z.string().uuid().nullable(),
  assignedPlaylistId: z.string().uuid().nullable(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActivityAt: z.string().datetime().nullable()
});

// Device registration schema
export const DeviceRegistrationSchema = z.object({
  code: z.string().min(6).max(20),
  deviceInfo: z.object({
    type: DeviceTypeEnum,
    name: z.string().optional(),
    screenResolution: z.object({
      width: z.number().positive(),
      height: z.number().positive()
    }),
    userAgent: z.string(),
    timezone: z.string().optional()
  })
});

// Device command schema
export const DeviceCommandSchema = z.object({
  id: z.string().uuid(),
  deviceId: z.string().uuid(),
  command: z.enum([
    'restart',
    'reload',
    'clearCache',
    'screenshot',
    'updateMenu',
    'updateSettings',
    'diagnose'
  ]),
  payload: z.any().optional(),
  status: z.enum(['pending', 'sent', 'acknowledged', 'completed', 'failed']),
  createdAt: z.string().datetime(),
  sentAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  result: z.any().optional(),
  error: z.string().optional()
});

// Device metrics schema
export const DeviceMetricsSchema = z.object({
  deviceId: z.string().uuid(),
  timestamp: z.string().datetime(),
  metrics: z.object({
    cpu: z.number().min(0).max(100).optional(),
    memory: z.number().min(0).max(100).optional(),
    storage: z.number().min(0).max(100).optional(),
    temperature: z.number().optional(),
    uptime: z.number().optional(), // seconds
    fps: z.number().optional(),
    networkLatency: z.number().optional(), // ms
    errors: z.number().default(0)
  })
});

// Type exports
export type DeviceType = z.infer<typeof DeviceTypeEnum>;
export type DeviceStatus = z.infer<typeof DeviceStatusEnum>;
export type DeviceOrientation = z.infer<typeof DeviceOrientationEnum>;
export type Device = z.infer<typeof DeviceSchema>;
export type DeviceRegistration = z.infer<typeof DeviceRegistrationSchema>;
export type DeviceCommand = z.infer<typeof DeviceCommandSchema>;
export type DeviceMetrics = z.infer<typeof DeviceMetricsSchema>;

// Helper functions
export function generateDeviceCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function isDeviceOnline(device: Device): boolean {
  if (device.status !== 'online') return false;
  if (!device.lastActivityAt) return false;
  
  const lastActivity = new Date(device.lastActivityAt);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  return lastActivity > fiveMinutesAgo;
}