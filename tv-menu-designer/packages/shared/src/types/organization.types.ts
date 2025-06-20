import { z } from 'zod';

// Plan type enum
export const PlanTypeEnum = z.enum(['free', 'starter', 'professional', 'enterprise', 'custom']);

// Organization status enum
export const OrganizationStatusEnum = z.enum(['active', 'inactive', 'suspended', 'trial']);

// Organization schema
export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  status: OrganizationStatusEnum,
  plan: z.object({
    type: PlanTypeEnum,
    features: z.object({
      maxDevices: z.number().default(1),
      maxMenus: z.number().default(5),
      maxUsers: z.number().default(3),
      customBranding: z.boolean().default(false),
      analytics: z.boolean().default(true),
      apiAccess: z.boolean().default(false),
      support: z.enum(['community', 'email', 'priority', '24/7']).default('community'),
      dataRetention: z.number().default(30), // days
      cloudStorage: z.number().default(1024), // MB
    }),
    billing: z.object({
      interval: z.enum(['monthly', 'yearly', 'lifetime']).optional(),
      amount: z.number().optional(),
      currency: z.string().default('USD'),
      nextBillingDate: z.string().datetime().nullable(),
      paymentMethod: z.string().optional()
    }).optional()
  }),
  settings: z.object({
    timezone: z.string().default('UTC'),
    language: z.string().default('en'),
    dateFormat: z.string().default('MM/DD/YYYY'),
    timeFormat: z.enum(['12h', '24h']).default('12h'),
    currency: z.string().default('USD'),
    notifications: z.object({
      email: z.object({
        deviceOffline: z.boolean().default(true),
        lowStorage: z.boolean().default(true),
        billingReminder: z.boolean().default(true),
        weeklyReport: z.boolean().default(false)
      }).default({})
    }).default({}),
    branding: z.object({
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
      font: z.string().optional(),
      customCss: z.string().optional()
    }).optional()
  }).default({}),
  metadata: z.object({
    industry: z.string().optional(),
    size: z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
    country: z.string().optional(),
    phone: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional()
    }).optional()
  }).optional(),
  limits: z.object({
    devices: z.object({
      current: z.number().default(0),
      max: z.number()
    }),
    menus: z.object({
      current: z.number().default(0),
      max: z.number()
    }),
    users: z.object({
      current: z.number().default(0),
      max: z.number()
    }),
    storage: z.object({
      current: z.number().default(0), // MB
      max: z.number() // MB
    })
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  trialEndsAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable()
});

// Invitation schema
export const InvitationSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['organization_admin', 'designer', 'viewer']),
  invitedBy: z.string().uuid(),
  token: z.string(),
  expiresAt: z.string().datetime(),
  acceptedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime()
});

// Usage stats schema
export const UsageStatsSchema = z.object({
  organizationId: z.string().uuid(),
  period: z.enum(['day', 'week', 'month']),
  date: z.string().datetime(),
  stats: z.object({
    devices: z.object({
      active: z.number(),
      total: z.number(),
      hoursOnline: z.number()
    }),
    menus: z.object({
      published: z.number(),
      draft: z.number(),
      views: z.number()
    }),
    storage: z.object({
      images: z.number(), // MB
      videos: z.number(), // MB
      documents: z.number(), // MB
      total: z.number() // MB
    }),
    api: z.object({
      calls: z.number(),
      errors: z.number(),
      latency: z.number() // ms
    })
  })
});

// Type exports
export type PlanType = z.infer<typeof PlanTypeEnum>;
export type OrganizationStatus = z.infer<typeof OrganizationStatusEnum>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Invitation = z.infer<typeof InvitationSchema>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;

// Plan limits
export const PLAN_LIMITS: Record<PlanType, Organization['plan']['features']> = {
  free: {
    maxDevices: 1,
    maxMenus: 3,
    maxUsers: 2,
    customBranding: false,
    analytics: true,
    apiAccess: false,
    support: 'community',
    dataRetention: 7,
    cloudStorage: 100
  },
  starter: {
    maxDevices: 5,
    maxMenus: 10,
    maxUsers: 5,
    customBranding: false,
    analytics: true,
    apiAccess: false,
    support: 'email',
    dataRetention: 30,
    cloudStorage: 1024
  },
  professional: {
    maxDevices: 20,
    maxMenus: 50,
    maxUsers: 15,
    customBranding: true,
    analytics: true,
    apiAccess: true,
    support: 'priority',
    dataRetention: 90,
    cloudStorage: 10240
  },
  enterprise: {
    maxDevices: 999,
    maxMenus: 999,
    maxUsers: 999,
    customBranding: true,
    analytics: true,
    apiAccess: true,
    support: '24/7',
    dataRetention: 365,
    cloudStorage: 102400
  },
  custom: {
    maxDevices: 999,
    maxMenus: 999,
    maxUsers: 999,
    customBranding: true,
    analytics: true,
    apiAccess: true,
    support: '24/7',
    dataRetention: 365,
    cloudStorage: 102400
  }
};

// Helper functions
export function isWithinLimit(
  organization: Organization,
  resource: 'devices' | 'menus' | 'users' | 'storage',
  currentValue: number
): boolean {
  const limit = organization.limits[resource];
  return currentValue <= limit.max;
}

export function calculateStorageUsage(stats: UsageStats['stats']['storage']): number {
  return stats.images + stats.videos + stats.documents;
}

export function isTrialExpired(organization: Organization): boolean {
  if (organization.status !== 'trial' || !organization.trialEndsAt) return false;
  return new Date(organization.trialEndsAt) < new Date();
}