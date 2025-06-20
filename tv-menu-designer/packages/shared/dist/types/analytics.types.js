"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchema = exports.DashboardDataSchema = exports.MetricsSchema = exports.AnalyticsEventSchema = exports.EventTypeEnum = void 0;
exports.calculateEngagementRate = calculateEngagementRate;
exports.calculateUptimePercentage = calculateUptimePercentage;
exports.formatDuration = formatDuration;
exports.getMetricTrend = getMetricTrend;
const zod_1 = require("zod");
// Event type enum
exports.EventTypeEnum = zod_1.z.enum([
    // Device events
    'device.connected',
    'device.disconnected',
    'device.error',
    'device.command',
    // Menu events
    'menu.displayed',
    'menu.error',
    'menu.interaction',
    // Page events
    'page.view',
    'page.duration',
    'page.transition',
    // Item events
    'item.view',
    'item.click',
    'item.hover',
    // System events
    'system.startup',
    'system.shutdown',
    'system.error',
    'system.update'
]);
// Analytics event schema
exports.AnalyticsEventSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    deviceId: zod_1.z.string().uuid(),
    menuId: zod_1.z.string().uuid().nullable(),
    sessionId: zod_1.z.string().uuid(),
    eventType: exports.EventTypeEnum,
    timestamp: zod_1.z.string().datetime(),
    data: zod_1.z.record(zod_1.z.any()).default({}),
    metadata: zod_1.z.object({
        ip: zod_1.z.string().optional(),
        userAgent: zod_1.z.string().optional(),
        location: zod_1.z.object({
            country: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
            latitude: zod_1.z.number().optional(),
            longitude: zod_1.z.number().optional()
        }).optional()
    }).optional()
});
// Aggregated metrics schema
exports.MetricsSchema = zod_1.z.object({
    organizationId: zod_1.z.string().uuid(),
    period: zod_1.z.enum(['hour', 'day', 'week', 'month', 'year']),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
    metrics: zod_1.z.object({
        devices: zod_1.z.object({
            total: zod_1.z.number(),
            online: zod_1.z.number(),
            offline: zod_1.z.number(),
            activeHours: zod_1.z.number()
        }),
        menus: zod_1.z.object({
            totalViews: zod_1.z.number(),
            uniqueDevices: zod_1.z.number(),
            avgViewDuration: zod_1.z.number(), // seconds
            popularMenus: zod_1.z.array(zod_1.z.object({
                menuId: zod_1.z.string().uuid(),
                menuName: zod_1.z.string(),
                views: zod_1.z.number()
            }))
        }),
        pages: zod_1.z.object({
            totalViews: zod_1.z.number(),
            avgDuration: zod_1.z.number(), // seconds
            bounceRate: zod_1.z.number(), // percentage
            popularPages: zod_1.z.array(zod_1.z.object({
                pageId: zod_1.z.string().uuid(),
                pageName: zod_1.z.string(),
                views: zod_1.z.number(),
                avgDuration: zod_1.z.number()
            }))
        }),
        items: zod_1.z.object({
            totalInteractions: zod_1.z.number(),
            clickThroughRate: zod_1.z.number(), // percentage
            popularItems: zod_1.z.array(zod_1.z.object({
                itemId: zod_1.z.string(),
                itemName: zod_1.z.string(),
                itemType: zod_1.z.string(),
                interactions: zod_1.z.number()
            }))
        }),
        performance: zod_1.z.object({
            avgLoadTime: zod_1.z.number(), // ms
            errorRate: zod_1.z.number(), // percentage
            uptime: zod_1.z.number() // percentage
        })
    })
});
// Real-time dashboard schema
exports.DashboardDataSchema = zod_1.z.object({
    organizationId: zod_1.z.string().uuid(),
    timestamp: zod_1.z.string().datetime(),
    realtime: zod_1.z.object({
        activeDevices: zod_1.z.number(),
        currentViewers: zod_1.z.number(),
        recentEvents: zod_1.z.array(exports.AnalyticsEventSchema).max(100)
    }),
    summary: zod_1.z.object({
        today: zod_1.z.object({
            views: zod_1.z.number(),
            devices: zod_1.z.number(),
            interactions: zod_1.z.number(),
            errors: zod_1.z.number()
        }),
        yesterday: zod_1.z.object({
            views: zod_1.z.number(),
            devices: zod_1.z.number(),
            interactions: zod_1.z.number(),
            errors: zod_1.z.number()
        }),
        weekToDate: zod_1.z.object({
            views: zod_1.z.number(),
            devices: zod_1.z.number(),
            interactions: zod_1.z.number(),
            errors: zod_1.z.number()
        })
    }),
    alerts: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.enum(['error', 'warning', 'info']),
        message: zod_1.z.string(),
        deviceId: zod_1.z.string().uuid().optional(),
        timestamp: zod_1.z.string().datetime()
    }))
});
// Report schema
exports.ReportSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['performance', 'usage', 'engagement', 'custom']),
    period: zod_1.z.object({
        start: zod_1.z.string().datetime(),
        end: zod_1.z.string().datetime()
    }),
    filters: zod_1.z.object({
        deviceIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        menuIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        locations: zod_1.z.array(zod_1.z.string()).optional()
    }).optional(),
    data: exports.MetricsSchema,
    format: zod_1.z.enum(['pdf', 'csv', 'json']),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.string().datetime()
});
// Helper functions
function calculateEngagementRate(views, interactions) {
    if (views === 0)
        return 0;
    return Math.round((interactions / views) * 100);
}
function calculateUptimePercentage(totalTime, downtime) {
    if (totalTime === 0)
        return 0;
    return Math.round(((totalTime - downtime) / totalTime) * 100);
}
function formatDuration(seconds) {
    if (seconds < 60)
        return `${Math.round(seconds)}s`;
    if (seconds < 3600)
        return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
}
function getMetricTrend(current, previous) {
    if (previous === 0) {
        return { trend: current > 0 ? 'up' : 'stable', percentage: 0 };
    }
    const percentage = Math.round(((current - previous) / previous) * 100);
    if (percentage > 5)
        return { trend: 'up', percentage };
    if (percentage < -5)
        return { trend: 'down', percentage: Math.abs(percentage) };
    return { trend: 'stable', percentage: 0 };
}
//# sourceMappingURL=analytics.types.js.map