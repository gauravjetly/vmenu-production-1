import { z } from 'zod';
export declare const PlanTypeEnum: z.ZodEnum<["free", "starter", "professional", "enterprise", "custom"]>;
export declare const OrganizationStatusEnum: z.ZodEnum<["active", "inactive", "suspended", "trial"]>;
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["active", "inactive", "suspended", "trial"]>;
    plan: z.ZodObject<{
        type: z.ZodEnum<["free", "starter", "professional", "enterprise", "custom"]>;
        features: z.ZodObject<{
            maxDevices: z.ZodDefault<z.ZodNumber>;
            maxMenus: z.ZodDefault<z.ZodNumber>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            customBranding: z.ZodDefault<z.ZodBoolean>;
            analytics: z.ZodDefault<z.ZodBoolean>;
            apiAccess: z.ZodDefault<z.ZodBoolean>;
            support: z.ZodDefault<z.ZodEnum<["community", "email", "priority", "24/7"]>>;
            dataRetention: z.ZodDefault<z.ZodNumber>;
            cloudStorage: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxDevices: number;
            maxMenus: number;
            maxUsers: number;
            customBranding: boolean;
            analytics: boolean;
            apiAccess: boolean;
            support: "email" | "community" | "priority" | "24/7";
            dataRetention: number;
            cloudStorage: number;
        }, {
            maxDevices?: number | undefined;
            maxMenus?: number | undefined;
            maxUsers?: number | undefined;
            customBranding?: boolean | undefined;
            analytics?: boolean | undefined;
            apiAccess?: boolean | undefined;
            support?: "email" | "community" | "priority" | "24/7" | undefined;
            dataRetention?: number | undefined;
            cloudStorage?: number | undefined;
        }>;
        billing: z.ZodOptional<z.ZodObject<{
            interval: z.ZodOptional<z.ZodEnum<["monthly", "yearly", "lifetime"]>>;
            amount: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodDefault<z.ZodString>;
            nextBillingDate: z.ZodNullable<z.ZodString>;
            paymentMethod: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            paymentMethod?: string | undefined;
        }, {
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            currency?: string | undefined;
            paymentMethod?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "free" | "starter" | "professional" | "enterprise";
        features: {
            maxDevices: number;
            maxMenus: number;
            maxUsers: number;
            customBranding: boolean;
            analytics: boolean;
            apiAccess: boolean;
            support: "email" | "community" | "priority" | "24/7";
            dataRetention: number;
            cloudStorage: number;
        };
        billing?: {
            currency: string;
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            paymentMethod?: string | undefined;
        } | undefined;
    }, {
        type: "custom" | "free" | "starter" | "professional" | "enterprise";
        features: {
            maxDevices?: number | undefined;
            maxMenus?: number | undefined;
            maxUsers?: number | undefined;
            customBranding?: boolean | undefined;
            analytics?: boolean | undefined;
            apiAccess?: boolean | undefined;
            support?: "email" | "community" | "priority" | "24/7" | undefined;
            dataRetention?: number | undefined;
            cloudStorage?: number | undefined;
        };
        billing?: {
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            currency?: string | undefined;
            paymentMethod?: string | undefined;
        } | undefined;
    }>;
    settings: z.ZodDefault<z.ZodObject<{
        timezone: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        dateFormat: z.ZodDefault<z.ZodString>;
        timeFormat: z.ZodDefault<z.ZodEnum<["12h", "24h"]>>;
        currency: z.ZodDefault<z.ZodString>;
        notifications: z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodObject<{
                deviceOffline: z.ZodDefault<z.ZodBoolean>;
                lowStorage: z.ZodDefault<z.ZodBoolean>;
                billingReminder: z.ZodDefault<z.ZodBoolean>;
                weeklyReport: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                deviceOffline: boolean;
                lowStorage: boolean;
                billingReminder: boolean;
                weeklyReport: boolean;
            }, {
                deviceOffline?: boolean | undefined;
                lowStorage?: boolean | undefined;
                billingReminder?: boolean | undefined;
                weeklyReport?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            email: {
                deviceOffline: boolean;
                lowStorage: boolean;
                billingReminder: boolean;
                weeklyReport: boolean;
            };
        }, {
            email?: {
                deviceOffline?: boolean | undefined;
                lowStorage?: boolean | undefined;
                billingReminder?: boolean | undefined;
                weeklyReport?: boolean | undefined;
            } | undefined;
        }>>;
        branding: z.ZodOptional<z.ZodObject<{
            primaryColor: z.ZodOptional<z.ZodString>;
            secondaryColor: z.ZodOptional<z.ZodString>;
            font: z.ZodOptional<z.ZodString>;
            customCss: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        }, {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timezone: string;
        language: string;
        notifications: {
            email: {
                deviceOffline: boolean;
                lowStorage: boolean;
                billingReminder: boolean;
                weeklyReport: boolean;
            };
        };
        currency: string;
        dateFormat: string;
        timeFormat: "12h" | "24h";
        branding?: {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        } | undefined;
    }, {
        timezone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            email?: {
                deviceOffline?: boolean | undefined;
                lowStorage?: boolean | undefined;
                billingReminder?: boolean | undefined;
                weeklyReport?: boolean | undefined;
            } | undefined;
        } | undefined;
        currency?: string | undefined;
        dateFormat?: string | undefined;
        timeFormat?: "12h" | "24h" | undefined;
        branding?: {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        } | undefined;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        industry: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodEnum<["small", "medium", "large", "enterprise"]>>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        }, {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        size?: "enterprise" | "small" | "medium" | "large" | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        industry?: string | undefined;
        address?: {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
    }, {
        size?: "enterprise" | "small" | "medium" | "large" | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        industry?: string | undefined;
        address?: {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
    }>>;
    limits: z.ZodObject<{
        devices: z.ZodObject<{
            current: z.ZodDefault<z.ZodNumber>;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            current: number;
            max: number;
        }, {
            max: number;
            current?: number | undefined;
        }>;
        menus: z.ZodObject<{
            current: z.ZodDefault<z.ZodNumber>;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            current: number;
            max: number;
        }, {
            max: number;
            current?: number | undefined;
        }>;
        users: z.ZodObject<{
            current: z.ZodDefault<z.ZodNumber>;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            current: number;
            max: number;
        }, {
            max: number;
            current?: number | undefined;
        }>;
        storage: z.ZodObject<{
            current: z.ZodDefault<z.ZodNumber>;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            current: number;
            max: number;
        }, {
            max: number;
            current?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        storage: {
            current: number;
            max: number;
        };
        devices: {
            current: number;
            max: number;
        };
        menus: {
            current: number;
            max: number;
        };
        users: {
            current: number;
            max: number;
        };
    }, {
        storage: {
            max: number;
            current?: number | undefined;
        };
        devices: {
            max: number;
            current?: number | undefined;
        };
        menus: {
            max: number;
            current?: number | undefined;
        };
        users: {
            max: number;
            current?: number | undefined;
        };
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    trialEndsAt: z.ZodNullable<z.ZodString>;
    deletedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "inactive" | "suspended" | "trial";
    name: string;
    createdAt: string;
    updatedAt: string;
    settings: {
        timezone: string;
        language: string;
        notifications: {
            email: {
                deviceOffline: boolean;
                lowStorage: boolean;
                billingReminder: boolean;
                weeklyReport: boolean;
            };
        };
        currency: string;
        dateFormat: string;
        timeFormat: "12h" | "24h";
        branding?: {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        } | undefined;
    };
    slug: string;
    plan: {
        type: "custom" | "free" | "starter" | "professional" | "enterprise";
        features: {
            maxDevices: number;
            maxMenus: number;
            maxUsers: number;
            customBranding: boolean;
            analytics: boolean;
            apiAccess: boolean;
            support: "email" | "community" | "priority" | "24/7";
            dataRetention: number;
            cloudStorage: number;
        };
        billing?: {
            currency: string;
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            paymentMethod?: string | undefined;
        } | undefined;
    };
    limits: {
        storage: {
            current: number;
            max: number;
        };
        devices: {
            current: number;
            max: number;
        };
        menus: {
            current: number;
            max: number;
        };
        users: {
            current: number;
            max: number;
        };
    };
    trialEndsAt: string | null;
    deletedAt: string | null;
    metadata?: {
        size?: "enterprise" | "small" | "medium" | "large" | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        industry?: string | undefined;
        address?: {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
    } | undefined;
    description?: string | undefined;
    logo?: string | undefined;
    website?: string | undefined;
}, {
    id: string;
    status: "active" | "inactive" | "suspended" | "trial";
    name: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    plan: {
        type: "custom" | "free" | "starter" | "professional" | "enterprise";
        features: {
            maxDevices?: number | undefined;
            maxMenus?: number | undefined;
            maxUsers?: number | undefined;
            customBranding?: boolean | undefined;
            analytics?: boolean | undefined;
            apiAccess?: boolean | undefined;
            support?: "email" | "community" | "priority" | "24/7" | undefined;
            dataRetention?: number | undefined;
            cloudStorage?: number | undefined;
        };
        billing?: {
            nextBillingDate: string | null;
            interval?: "monthly" | "yearly" | "lifetime" | undefined;
            amount?: number | undefined;
            currency?: string | undefined;
            paymentMethod?: string | undefined;
        } | undefined;
    };
    limits: {
        storage: {
            max: number;
            current?: number | undefined;
        };
        devices: {
            max: number;
            current?: number | undefined;
        };
        menus: {
            max: number;
            current?: number | undefined;
        };
        users: {
            max: number;
            current?: number | undefined;
        };
    };
    trialEndsAt: string | null;
    deletedAt: string | null;
    metadata?: {
        size?: "enterprise" | "small" | "medium" | "large" | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        industry?: string | undefined;
        address?: {
            country?: string | undefined;
            city?: string | undefined;
            street?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
    } | undefined;
    description?: string | undefined;
    settings?: {
        timezone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            email?: {
                deviceOffline?: boolean | undefined;
                lowStorage?: boolean | undefined;
                billingReminder?: boolean | undefined;
                weeklyReport?: boolean | undefined;
            } | undefined;
        } | undefined;
        currency?: string | undefined;
        dateFormat?: string | undefined;
        timeFormat?: "12h" | "24h" | undefined;
        branding?: {
            primaryColor?: string | undefined;
            secondaryColor?: string | undefined;
            font?: string | undefined;
            customCss?: string | undefined;
        } | undefined;
    } | undefined;
    logo?: string | undefined;
    website?: string | undefined;
}>;
export declare const InvitationSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["organization_admin", "designer", "viewer"]>;
    invitedBy: z.ZodString;
    token: z.ZodString;
    expiresAt: z.ZodString;
    acceptedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    organizationId: string;
    email: string;
    role: "organization_admin" | "designer" | "viewer";
    token: string;
    expiresAt: string;
    invitedBy: string;
    acceptedAt: string | null;
}, {
    id: string;
    createdAt: string;
    organizationId: string;
    email: string;
    role: "organization_admin" | "designer" | "viewer";
    token: string;
    expiresAt: string;
    invitedBy: string;
    acceptedAt: string | null;
}>;
export declare const UsageStatsSchema: z.ZodObject<{
    organizationId: z.ZodString;
    period: z.ZodEnum<["day", "week", "month"]>;
    date: z.ZodString;
    stats: z.ZodObject<{
        devices: z.ZodObject<{
            active: z.ZodNumber;
            total: z.ZodNumber;
            hoursOnline: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            active: number;
            total: number;
            hoursOnline: number;
        }, {
            active: number;
            total: number;
            hoursOnline: number;
        }>;
        menus: z.ZodObject<{
            published: z.ZodNumber;
            draft: z.ZodNumber;
            views: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            views: number;
            published: number;
            draft: number;
        }, {
            views: number;
            published: number;
            draft: number;
        }>;
        storage: z.ZodObject<{
            images: z.ZodNumber;
            videos: z.ZodNumber;
            documents: z.ZodNumber;
            total: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            total: number;
            images: number;
            videos: number;
            documents: number;
        }, {
            total: number;
            images: number;
            videos: number;
            documents: number;
        }>;
        api: z.ZodObject<{
            calls: z.ZodNumber;
            errors: z.ZodNumber;
            latency: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            errors: number;
            calls: number;
            latency: number;
        }, {
            errors: number;
            calls: number;
            latency: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        storage: {
            total: number;
            images: number;
            videos: number;
            documents: number;
        };
        devices: {
            active: number;
            total: number;
            hoursOnline: number;
        };
        menus: {
            views: number;
            published: number;
            draft: number;
        };
        api: {
            errors: number;
            calls: number;
            latency: number;
        };
    }, {
        storage: {
            total: number;
            images: number;
            videos: number;
            documents: number;
        };
        devices: {
            active: number;
            total: number;
            hoursOnline: number;
        };
        menus: {
            views: number;
            published: number;
            draft: number;
        };
        api: {
            errors: number;
            calls: number;
            latency: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    date: string;
    organizationId: string;
    period: "day" | "week" | "month";
    stats: {
        storage: {
            total: number;
            images: number;
            videos: number;
            documents: number;
        };
        devices: {
            active: number;
            total: number;
            hoursOnline: number;
        };
        menus: {
            views: number;
            published: number;
            draft: number;
        };
        api: {
            errors: number;
            calls: number;
            latency: number;
        };
    };
}, {
    date: string;
    organizationId: string;
    period: "day" | "week" | "month";
    stats: {
        storage: {
            total: number;
            images: number;
            videos: number;
            documents: number;
        };
        devices: {
            active: number;
            total: number;
            hoursOnline: number;
        };
        menus: {
            views: number;
            published: number;
            draft: number;
        };
        api: {
            errors: number;
            calls: number;
            latency: number;
        };
    };
}>;
export type PlanType = z.infer<typeof PlanTypeEnum>;
export type OrganizationStatus = z.infer<typeof OrganizationStatusEnum>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Invitation = z.infer<typeof InvitationSchema>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export declare const PLAN_LIMITS: Record<PlanType, Organization['plan']['features']>;
export declare function isWithinLimit(organization: Organization, resource: 'devices' | 'menus' | 'users' | 'storage', currentValue: number): boolean;
export declare function calculateStorageUsage(stats: UsageStats['stats']['storage']): number;
export declare function isTrialExpired(organization: Organization): boolean;
//# sourceMappingURL=organization.types.d.ts.map