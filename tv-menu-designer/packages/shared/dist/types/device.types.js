"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMetricsSchema = exports.DeviceCommandSchema = exports.DeviceRegistrationSchema = exports.DeviceSchema = exports.DeviceOrientationEnum = exports.DeviceStatusEnum = exports.DeviceTypeEnum = void 0;
exports.generateDeviceCode = generateDeviceCode;
exports.isDeviceOnline = isDeviceOnline;
const zod_1 = require("zod");
// Device type enum
exports.DeviceTypeEnum = zod_1.z.enum(['display', 'tablet', 'mobile', 'kiosk', 'web']);
// Device status enum
exports.DeviceStatusEnum = zod_1.z.enum(['online', 'offline', 'error', 'maintenance']);
// Device orientation enum
exports.DeviceOrientationEnum = zod_1.z.enum(['landscape', 'portrait', 'auto']);
// Device schema
exports.DeviceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    code: zod_1.z.string().min(6).max(20), // Unique pairing code
    type: exports.DeviceTypeEnum,
    status: exports.DeviceStatusEnum,
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.object({
        screenResolution: zod_1.z.object({
            width: zod_1.z.number().positive(),
            height: zod_1.z.number().positive()
        }).optional(),
        orientation: exports.DeviceOrientationEnum.optional(),
        browser: zod_1.z.string().optional(),
        os: zod_1.z.string().optional(),
        version: zod_1.z.string().optional(),
        ip: zod_1.z.string().optional(),
        lastSeen: zod_1.z.string().datetime().optional()
    }).optional(),
    settings: zod_1.z.object({
        brightness: zod_1.z.number().min(0).max(100).default(100),
        volume: zod_1.z.number().min(0).max(100).default(50),
        autoUpdate: zod_1.z.boolean().default(true),
        sleepSchedule: zod_1.z.object({
            enabled: zod_1.z.boolean().default(false),
            startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/), // HH:MM format
            endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
        }).optional(),
        restartSchedule: zod_1.z.object({
            enabled: zod_1.z.boolean().default(false),
            time: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
            days: zod_1.z.array(zod_1.z.number().min(0).max(6)) // 0 = Sunday, 6 = Saturday
        }).optional()
    }).default({}),
    assignedMenuId: zod_1.z.string().uuid().nullable(),
    assignedPlaylistId: zod_1.z.string().uuid().nullable(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    lastActivityAt: zod_1.z.string().datetime().nullable()
});
// Device registration schema
exports.DeviceRegistrationSchema = zod_1.z.object({
    code: zod_1.z.string().min(6).max(20),
    deviceInfo: zod_1.z.object({
        type: exports.DeviceTypeEnum,
        name: zod_1.z.string().optional(),
        screenResolution: zod_1.z.object({
            width: zod_1.z.number().positive(),
            height: zod_1.z.number().positive()
        }),
        userAgent: zod_1.z.string(),
        timezone: zod_1.z.string().optional()
    })
});
// Device command schema
exports.DeviceCommandSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    deviceId: zod_1.z.string().uuid(),
    command: zod_1.z.enum([
        'restart',
        'reload',
        'clearCache',
        'screenshot',
        'updateMenu',
        'updateSettings',
        'diagnose'
    ]),
    payload: zod_1.z.any().optional(),
    status: zod_1.z.enum(['pending', 'sent', 'acknowledged', 'completed', 'failed']),
    createdAt: zod_1.z.string().datetime(),
    sentAt: zod_1.z.string().datetime().nullable(),
    completedAt: zod_1.z.string().datetime().nullable(),
    result: zod_1.z.any().optional(),
    error: zod_1.z.string().optional()
});
// Device metrics schema
exports.DeviceMetricsSchema = zod_1.z.object({
    deviceId: zod_1.z.string().uuid(),
    timestamp: zod_1.z.string().datetime(),
    metrics: zod_1.z.object({
        cpu: zod_1.z.number().min(0).max(100).optional(),
        memory: zod_1.z.number().min(0).max(100).optional(),
        storage: zod_1.z.number().min(0).max(100).optional(),
        temperature: zod_1.z.number().optional(),
        uptime: zod_1.z.number().optional(), // seconds
        fps: zod_1.z.number().optional(),
        networkLatency: zod_1.z.number().optional(), // ms
        errors: zod_1.z.number().default(0)
    })
});
// Helper functions
function generateDeviceCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
function isDeviceOnline(device) {
    if (device.status !== 'online')
        return false;
    if (!device.lastActivityAt)
        return false;
    const lastActivity = new Date(device.lastActivityAt);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastActivity > fiveMinutesAgo;
}
//# sourceMappingURL=device.types.js.map