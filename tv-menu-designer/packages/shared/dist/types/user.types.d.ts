import { z } from 'zod';
export declare const UserRoleEnum: z.ZodEnum<["super_admin", "organization_owner", "organization_admin", "designer", "viewer"]>;
export declare const UserStatusEnum: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
export declare const PermissionEnum: z.ZodEnum<["organization.view", "organization.edit", "organization.delete", "organization.billing", "user.view", "user.create", "user.edit", "user.delete", "menu.view", "menu.create", "menu.edit", "menu.delete", "menu.publish", "device.view", "device.create", "device.edit", "device.delete", "device.control", "analytics.view", "analytics.export", "template.view", "template.create", "template.edit", "template.delete"]>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<["super_admin", "organization_owner", "organization_admin", "designer", "viewer"]>;
    status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
    organizationId: z.ZodNullable<z.ZodString>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodEnum<["organization.view", "organization.edit", "organization.delete", "organization.billing", "user.view", "user.create", "user.edit", "user.delete", "menu.view", "menu.create", "menu.edit", "menu.delete", "menu.publish", "device.view", "device.create", "device.edit", "device.delete", "device.control", "analytics.view", "analytics.export", "template.view", "template.create", "template.edit", "template.delete"]>, "many">>;
    profile: z.ZodDefault<z.ZodObject<{
        avatar: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        timezone: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        notifications: z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            push: z.ZodDefault<z.ZodBoolean>;
            sms: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            push: boolean;
            email: boolean;
            sms: boolean;
        }, {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timezone: string;
        language: string;
        notifications: {
            push: boolean;
            email: boolean;
            sms: boolean;
        };
        avatar?: string | undefined;
        phone?: string | undefined;
    }, {
        timezone?: string | undefined;
        avatar?: string | undefined;
        phone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    }>>;
    metadata: z.ZodDefault<z.ZodObject<{
        lastLogin: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        loginCount: z.ZodDefault<z.ZodNumber>;
        failedLoginAttempts: z.ZodDefault<z.ZodNumber>;
        passwordChangedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        emailVerified: z.ZodDefault<z.ZodBoolean>;
        emailVerifiedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        twoFactorEnabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        lastLogin: string | null;
        loginCount: number;
        failedLoginAttempts: number;
        passwordChangedAt: string | null;
        emailVerified: boolean;
        emailVerifiedAt: string | null;
        twoFactorEnabled: boolean;
    }, {
        lastLogin?: string | null | undefined;
        loginCount?: number | undefined;
        failedLoginAttempts?: number | undefined;
        passwordChangedAt?: string | null | undefined;
        emailVerified?: boolean | undefined;
        emailVerifiedAt?: string | null | undefined;
        twoFactorEnabled?: boolean | undefined;
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "active" | "inactive" | "suspended";
    metadata: {
        lastLogin: string | null;
        loginCount: number;
        failedLoginAttempts: number;
        passwordChangedAt: string | null;
        emailVerified: boolean;
        emailVerifiedAt: string | null;
        twoFactorEnabled: boolean;
    };
    createdAt: string;
    updatedAt: string;
    organizationId: string | null;
    email: string;
    firstName: string;
    lastName: string;
    role: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer";
    permissions: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[];
    profile: {
        timezone: string;
        language: string;
        notifications: {
            push: boolean;
            email: boolean;
            sms: boolean;
        };
        avatar?: string | undefined;
        phone?: string | undefined;
    };
    username?: string | undefined;
}, {
    id: string;
    status: "pending" | "active" | "inactive" | "suspended";
    createdAt: string;
    updatedAt: string;
    organizationId: string | null;
    email: string;
    firstName: string;
    lastName: string;
    role: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer";
    metadata?: {
        lastLogin?: string | null | undefined;
        loginCount?: number | undefined;
        failedLoginAttempts?: number | undefined;
        passwordChangedAt?: string | null | undefined;
        emailVerified?: boolean | undefined;
        emailVerifiedAt?: string | null | undefined;
        twoFactorEnabled?: boolean | undefined;
    } | undefined;
    username?: string | undefined;
    permissions?: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[] | undefined;
    profile?: {
        timezone?: string | undefined;
        avatar?: string | undefined;
        phone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["super_admin", "organization_owner", "organization_admin", "designer", "viewer"]>>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    organizationId?: string | undefined;
    role?: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer" | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    organizationId?: string | undefined;
    role?: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer" | undefined;
}>;
export declare const UpdateUserSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["super_admin", "organization_owner", "organization_admin", "designer", "viewer"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    permissions: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["organization.view", "organization.edit", "organization.delete", "organization.billing", "user.view", "user.create", "user.edit", "user.delete", "menu.view", "menu.create", "menu.edit", "menu.delete", "menu.publish", "device.view", "device.create", "device.edit", "device.delete", "device.control", "analytics.view", "analytics.export", "template.view", "template.create", "template.edit", "template.delete"]>, "many">>>;
    profile: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        avatar: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        timezone: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        notifications: z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            push: z.ZodDefault<z.ZodBoolean>;
            sms: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            push: boolean;
            email: boolean;
            sms: boolean;
        }, {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timezone: string;
        language: string;
        notifications: {
            push: boolean;
            email: boolean;
            sms: boolean;
        };
        avatar?: string | undefined;
        phone?: string | undefined;
    }, {
        timezone?: string | undefined;
        avatar?: string | undefined;
        phone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    }>>>;
    metadata: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        lastLogin: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        loginCount: z.ZodDefault<z.ZodNumber>;
        failedLoginAttempts: z.ZodDefault<z.ZodNumber>;
        passwordChangedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        emailVerified: z.ZodDefault<z.ZodBoolean>;
        emailVerifiedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        twoFactorEnabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        lastLogin: string | null;
        loginCount: number;
        failedLoginAttempts: number;
        passwordChangedAt: string | null;
        emailVerified: boolean;
        emailVerifiedAt: string | null;
        twoFactorEnabled: boolean;
    }, {
        lastLogin?: string | null | undefined;
        loginCount?: number | undefined;
        failedLoginAttempts?: number | undefined;
        passwordChangedAt?: string | null | undefined;
        emailVerified?: boolean | undefined;
        emailVerifiedAt?: string | null | undefined;
        twoFactorEnabled?: boolean | undefined;
    }>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "id" | "createdAt" | "email">, "strip", z.ZodTypeAny, {
    status?: "pending" | "active" | "inactive" | "suspended" | undefined;
    metadata?: {
        lastLogin: string | null;
        loginCount: number;
        failedLoginAttempts: number;
        passwordChangedAt: string | null;
        emailVerified: boolean;
        emailVerifiedAt: string | null;
        twoFactorEnabled: boolean;
    } | undefined;
    updatedAt?: string | undefined;
    organizationId?: string | null | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer" | undefined;
    permissions?: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[] | undefined;
    profile?: {
        timezone: string;
        language: string;
        notifications: {
            push: boolean;
            email: boolean;
            sms: boolean;
        };
        avatar?: string | undefined;
        phone?: string | undefined;
    } | undefined;
}, {
    status?: "pending" | "active" | "inactive" | "suspended" | undefined;
    metadata?: {
        lastLogin?: string | null | undefined;
        loginCount?: number | undefined;
        failedLoginAttempts?: number | undefined;
        passwordChangedAt?: string | null | undefined;
        emailVerified?: boolean | undefined;
        emailVerifiedAt?: string | null | undefined;
        twoFactorEnabled?: boolean | undefined;
    } | undefined;
    updatedAt?: string | undefined;
    organizationId?: string | null | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: "super_admin" | "organization_owner" | "organization_admin" | "designer" | "viewer" | undefined;
    permissions?: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[] | undefined;
    profile?: {
        timezone?: string | undefined;
        avatar?: string | undefined;
        phone?: string | undefined;
        language?: string | undefined;
        notifications?: {
            push?: boolean | undefined;
            email?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    token: z.ZodString;
    refreshToken: z.ZodOptional<z.ZodString>;
    deviceInfo: z.ZodOptional<z.ZodObject<{
        userAgent: z.ZodString;
        ip: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ip: string;
        userAgent: string;
        location?: string | undefined;
    }, {
        ip: string;
        userAgent: string;
        location?: string | undefined;
    }>>;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    userId: string;
    token: string;
    expiresAt: string;
    deviceInfo?: {
        ip: string;
        userAgent: string;
        location?: string | undefined;
    } | undefined;
    refreshToken?: string | undefined;
}, {
    id: string;
    createdAt: string;
    userId: string;
    token: string;
    expiresAt: string;
    deviceInfo?: {
        ip: string;
        userAgent: string;
        location?: string | undefined;
    } | undefined;
    refreshToken?: string | undefined;
}>;
export declare const ApiKeySchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    key: z.ZodString;
    permissions: z.ZodArray<z.ZodEnum<["organization.view", "organization.edit", "organization.delete", "organization.billing", "user.view", "user.create", "user.edit", "user.delete", "menu.view", "menu.create", "menu.edit", "menu.delete", "menu.publish", "device.view", "device.create", "device.edit", "device.delete", "device.control", "analytics.view", "analytics.export", "template.view", "template.create", "template.edit", "template.delete"]>, "many">;
    expiresAt: z.ZodNullable<z.ZodString>;
    lastUsedAt: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    revokedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: string;
    organizationId: string;
    permissions: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[];
    expiresAt: string | null;
    key: string;
    lastUsedAt: string | null;
    createdBy: string;
    revokedAt: string | null;
}, {
    id: string;
    name: string;
    createdAt: string;
    organizationId: string;
    permissions: ("organization.view" | "organization.edit" | "organization.delete" | "organization.billing" | "user.view" | "user.create" | "user.edit" | "user.delete" | "menu.view" | "menu.create" | "menu.edit" | "menu.delete" | "menu.publish" | "device.view" | "device.create" | "device.edit" | "device.delete" | "device.control" | "analytics.view" | "analytics.export" | "template.view" | "template.create" | "template.edit" | "template.delete")[];
    expiresAt: string | null;
    key: string;
    lastUsedAt: string | null;
    createdBy: string;
    revokedAt: string | null;
}>;
export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type Permission = z.infer<typeof PermissionEnum>;
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type ApiKey = z.infer<typeof ApiKeySchema>;
export declare const ROLE_HIERARCHY: Record<UserRole, number>;
export declare const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]>;
export declare function hasPermission(user: User, permission: Permission): boolean;
export declare function hasRole(user: User, requiredRole: UserRole): boolean;
export declare function canManageUser(manager: User, targetUser: User): boolean;
//# sourceMappingURL=user.types.d.ts.map