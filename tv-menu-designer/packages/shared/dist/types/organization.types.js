"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_LIMITS = exports.UsageStatsSchema = exports.InvitationSchema = exports.OrganizationSchema = exports.OrganizationStatusEnum = exports.PlanTypeEnum = void 0;
exports.isWithinLimit = isWithinLimit;
exports.calculateStorageUsage = calculateStorageUsage;
exports.isTrialExpired = isTrialExpired;
const zod_1 = require("zod");
// Plan type enum
exports.PlanTypeEnum = zod_1.z.enum(['free', 'starter', 'professional', 'enterprise', 'custom']);
// Organization status enum
exports.OrganizationStatusEnum = zod_1.z.enum(['active', 'inactive', 'suspended', 'trial']);
// Organization schema
exports.OrganizationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    slug: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().optional(),
    logo: zod_1.z.string().url().optional(),
    website: zod_1.z.string().url().optional(),
    status: exports.OrganizationStatusEnum,
    plan: zod_1.z.object({
        type: exports.PlanTypeEnum,
        features: zod_1.z.object({
            maxDevices: zod_1.z.number().default(1),
            maxMenus: zod_1.z.number().default(5),
            maxUsers: zod_1.z.number().default(3),
            customBranding: zod_1.z.boolean().default(false),
            analytics: zod_1.z.boolean().default(true),
            apiAccess: zod_1.z.boolean().default(false),
            support: zod_1.z.enum(['community', 'email', 'priority', '24/7']).default('community'),
            dataRetention: zod_1.z.number().default(30), // days
            cloudStorage: zod_1.z.number().default(1024), // MB
        }),
        billing: zod_1.z.object({
            interval: zod_1.z.enum(['monthly', 'yearly', 'lifetime']).optional(),
            amount: zod_1.z.number().optional(),
            currency: zod_1.z.string().default('USD'),
            nextBillingDate: zod_1.z.string().datetime().nullable(),
            paymentMethod: zod_1.z.string().optional()
        }).optional()
    }),
    settings: zod_1.z.object({
        timezone: zod_1.z.string().default('UTC'),
        language: zod_1.z.string().default('en'),
        dateFormat: zod_1.z.string().default('MM/DD/YYYY'),
        timeFormat: zod_1.z.enum(['12h', '24h']).default('12h'),
        currency: zod_1.z.string().default('USD'),
        notifications: zod_1.z.object({
            email: zod_1.z.object({
                deviceOffline: zod_1.z.boolean().default(true),
                lowStorage: zod_1.z.boolean().default(true),
                billingReminder: zod_1.z.boolean().default(true),
                weeklyReport: zod_1.z.boolean().default(false)
            }).default({})
        }).default({}),
        branding: zod_1.z.object({
            primaryColor: zod_1.z.string().optional(),
            secondaryColor: zod_1.z.string().optional(),
            font: zod_1.z.string().optional(),
            customCss: zod_1.z.string().optional()
        }).optional()
    }).default({}),
    metadata: zod_1.z.object({
        industry: zod_1.z.string().optional(),
        size: zod_1.z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
        country: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.object({
            street: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
            state: zod_1.z.string().optional(),
            postalCode: zod_1.z.string().optional(),
            country: zod_1.z.string().optional()
        }).optional()
    }).optional(),
    limits: zod_1.z.object({
        devices: zod_1.z.object({
            current: zod_1.z.number().default(0),
            max: zod_1.z.number()
        }),
        menus: zod_1.z.object({
            current: zod_1.z.number().default(0),
            max: zod_1.z.number()
        }),
        users: zod_1.z.object({
            current: zod_1.z.number().default(0),
            max: zod_1.z.number()
        }),
        storage: zod_1.z.object({
            current: zod_1.z.number().default(0), // MB
            max: zod_1.z.number() // MB
        })
    }),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    trialEndsAt: zod_1.z.string().datetime().nullable(),
    deletedAt: zod_1.z.string().datetime().nullable()
});
// Invitation schema
exports.InvitationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(['organization_admin', 'designer', 'viewer']),
    invitedBy: zod_1.z.string().uuid(),
    token: zod_1.z.string(),
    expiresAt: zod_1.z.string().datetime(),
    acceptedAt: zod_1.z.string().datetime().nullable(),
    createdAt: zod_1.z.string().datetime()
});
// Usage stats schema
exports.UsageStatsSchema = zod_1.z.object({
    organizationId: zod_1.z.string().uuid(),
    period: zod_1.z.enum(['day', 'week', 'month']),
    date: zod_1.z.string().datetime(),
    stats: zod_1.z.object({
        devices: zod_1.z.object({
            active: zod_1.z.number(),
            total: zod_1.z.number(),
            hoursOnline: zod_1.z.number()
        }),
        menus: zod_1.z.object({
            published: zod_1.z.number(),
            draft: zod_1.z.number(),
            views: zod_1.z.number()
        }),
        storage: zod_1.z.object({
            images: zod_1.z.number(), // MB
            videos: zod_1.z.number(), // MB
            documents: zod_1.z.number(), // MB
            total: zod_1.z.number() // MB
        }),
        api: zod_1.z.object({
            calls: zod_1.z.number(),
            errors: zod_1.z.number(),
            latency: zod_1.z.number() // ms
        })
    })
});
// Plan limits
exports.PLAN_LIMITS = {
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
function isWithinLimit(organization, resource, currentValue) {
    const limit = organization.limits[resource];
    return currentValue <= limit.max;
}
function calculateStorageUsage(stats) {
    return stats.images + stats.videos + stats.documents;
}
function isTrialExpired(organization) {
    if (organization.status !== 'trial' || !organization.trialEndsAt)
        return false;
    return new Date(organization.trialEndsAt) < new Date();
}
//# sourceMappingURL=organization.types.js.map