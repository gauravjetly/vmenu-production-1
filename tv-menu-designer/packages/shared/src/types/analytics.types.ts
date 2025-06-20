import { z } from 'zod';

// Event type enum
export const EventTypeEnum = z.enum([
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
export const AnalyticsEventSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  deviceId: z.string().uuid(),
  menuId: z.string().uuid().nullable(),
  sessionId: z.string().uuid(),
  eventType: EventTypeEnum,
  timestamp: z.string().datetime(),
  data: z.record(z.any()).default({}),
  metadata: z.object({
    ip: z.string().optional(),
    userAgent: z.string().optional(),
    location: z.object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional()
    }).optional()
  }).optional()
});

// Aggregated metrics schema
export const MetricsSchema = z.object({
  organizationId: z.string().uuid(),
  period: z.enum(['hour', 'day', 'week', 'month', 'year']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  metrics: z.object({
    devices: z.object({
      total: z.number(),
      online: z.number(),
      offline: z.number(),
      activeHours: z.number()
    }),
    menus: z.object({
      totalViews: z.number(),
      uniqueDevices: z.number(),
      avgViewDuration: z.number(), // seconds
      popularMenus: z.array(z.object({
        menuId: z.string().uuid(),
        menuName: z.string(),
        views: z.number()
      }))
    }),
    pages: z.object({
      totalViews: z.number(),
      avgDuration: z.number(), // seconds
      bounceRate: z.number(), // percentage
      popularPages: z.array(z.object({
        pageId: z.string().uuid(),
        pageName: z.string(),
        views: z.number(),
        avgDuration: z.number()
      }))
    }),
    items: z.object({
      totalInteractions: z.number(),
      clickThroughRate: z.number(), // percentage
      popularItems: z.array(z.object({
        itemId: z.string(),
        itemName: z.string(),
        itemType: z.string(),
        interactions: z.number()
      }))
    }),
    performance: z.object({
      avgLoadTime: z.number(), // ms
      errorRate: z.number(), // percentage
      uptime: z.number() // percentage
    })
  })
});

// Real-time dashboard schema
export const DashboardDataSchema = z.object({
  organizationId: z.string().uuid(),
  timestamp: z.string().datetime(),
  realtime: z.object({
    activeDevices: z.number(),
    currentViewers: z.number(),
    recentEvents: z.array(AnalyticsEventSchema).max(100)
  }),
  summary: z.object({
    today: z.object({
      views: z.number(),
      devices: z.number(),
      interactions: z.number(),
      errors: z.number()
    }),
    yesterday: z.object({
      views: z.number(),
      devices: z.number(),
      interactions: z.number(),
      errors: z.number()
    }),
    weekToDate: z.object({
      views: z.number(),
      devices: z.number(),
      interactions: z.number(),
      errors: z.number()
    })
  }),
  alerts: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['error', 'warning', 'info']),
    message: z.string(),
    deviceId: z.string().uuid().optional(),
    timestamp: z.string().datetime()
  }))
});

// Report schema
export const ReportSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string(),
  type: z.enum(['performance', 'usage', 'engagement', 'custom']),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }),
  filters: z.object({
    deviceIds: z.array(z.string().uuid()).optional(),
    menuIds: z.array(z.string().uuid()).optional(),
    locations: z.array(z.string()).optional()
  }).optional(),
  data: MetricsSchema,
  format: z.enum(['pdf', 'csv', 'json']),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime()
});

// Type exports
export type EventType = z.infer<typeof EventTypeEnum>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type Metrics = z.infer<typeof MetricsSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type Report = z.infer<typeof ReportSchema>;

// Helper functions
export function calculateEngagementRate(views: number, interactions: number): number {
  if (views === 0) return 0;
  return Math.round((interactions / views) * 100);
}

export function calculateUptimePercentage(totalTime: number, downtime: number): number {
  if (totalTime === 0) return 0;
  return Math.round(((totalTime - downtime) / totalTime) * 100);
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

export function getMetricTrend(current: number, previous: number): {
  trend: 'up' | 'down' | 'stable';
  percentage: number;
} {
  if (previous === 0) {
    return { trend: current > 0 ? 'up' : 'stable', percentage: 0 };
  }
  
  const percentage = Math.round(((current - previous) / previous) * 100);
  
  if (percentage > 5) return { trend: 'up', percentage };
  if (percentage < -5) return { trend: 'down', percentage: Math.abs(percentage) };
  return { trend: 'stable', percentage: 0 };
}