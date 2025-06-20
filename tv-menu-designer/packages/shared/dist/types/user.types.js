"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PERMISSIONS = exports.ROLE_HIERARCHY = exports.ApiKeySchema = exports.SessionSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = exports.PermissionEnum = exports.UserStatusEnum = exports.UserRoleEnum = void 0;
exports.hasPermission = hasPermission;
exports.hasRole = hasRole;
exports.canManageUser = canManageUser;
const zod_1 = require("zod");
// User role enum
exports.UserRoleEnum = zod_1.z.enum([
    'super_admin',
    'organization_owner',
    'organization_admin',
    'designer',
    'viewer'
]);
// User status enum
exports.UserStatusEnum = zod_1.z.enum(['active', 'inactive', 'pending', 'suspended']);
// Permission enum
exports.PermissionEnum = zod_1.z.enum([
    // Organization permissions
    'organization.view',
    'organization.edit',
    'organization.delete',
    'organization.billing',
    // User permissions
    'user.view',
    'user.create',
    'user.edit',
    'user.delete',
    // Menu permissions
    'menu.view',
    'menu.create',
    'menu.edit',
    'menu.delete',
    'menu.publish',
    // Device permissions
    'device.view',
    'device.create',
    'device.edit',
    'device.delete',
    'device.control',
    // Analytics permissions
    'analytics.view',
    'analytics.export',
    // Template permissions
    'template.view',
    'template.create',
    'template.edit',
    'template.delete'
]);
// User schema
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(3).max(50).optional(),
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    role: exports.UserRoleEnum,
    status: exports.UserStatusEnum,
    organizationId: zod_1.z.string().uuid().nullable(),
    permissions: zod_1.z.array(exports.PermissionEnum).default([]),
    profile: zod_1.z.object({
        avatar: zod_1.z.string().url().optional(),
        phone: zod_1.z.string().optional(),
        timezone: zod_1.z.string().default('UTC'),
        language: zod_1.z.string().default('en'),
        notifications: zod_1.z.object({
            email: zod_1.z.boolean().default(true),
            push: zod_1.z.boolean().default(true),
            sms: zod_1.z.boolean().default(false)
        }).default({})
    }).default({}),
    metadata: zod_1.z.object({
        lastLogin: zod_1.z.string().datetime().nullable().default(null),
        loginCount: zod_1.z.number().default(0),
        failedLoginAttempts: zod_1.z.number().default(0),
        passwordChangedAt: zod_1.z.string().datetime().nullable().default(null),
        emailVerified: zod_1.z.boolean().default(false),
        emailVerifiedAt: zod_1.z.string().datetime().nullable().default(null),
        twoFactorEnabled: zod_1.z.boolean().default(false)
    }).default({
        lastLogin: null,
        loginCount: 0,
        failedLoginAttempts: 0,
        passwordChangedAt: null,
        emailVerified: false,
        emailVerifiedAt: null,
        twoFactorEnabled: false
    }),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime()
});
// User creation schema
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(100),
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    role: exports.UserRoleEnum.optional(),
    organizationId: zod_1.z.string().uuid().optional()
});
// User update schema
exports.UpdateUserSchema = exports.UserSchema.partial().omit({
    id: true,
    email: true,
    createdAt: true
});
// Session schema
exports.SessionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    token: zod_1.z.string(),
    refreshToken: zod_1.z.string().optional(),
    deviceInfo: zod_1.z.object({
        userAgent: zod_1.z.string(),
        ip: zod_1.z.string(),
        location: zod_1.z.string().optional()
    }).optional(),
    expiresAt: zod_1.z.string().datetime(),
    createdAt: zod_1.z.string().datetime()
});
// API key schema
exports.ApiKeySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    key: zod_1.z.string().min(32),
    permissions: zod_1.z.array(exports.PermissionEnum),
    expiresAt: zod_1.z.string().datetime().nullable(),
    lastUsedAt: zod_1.z.string().datetime().nullable(),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.string().datetime(),
    revokedAt: zod_1.z.string().datetime().nullable()
});
// Role hierarchy
exports.ROLE_HIERARCHY = {
    super_admin: 100,
    organization_owner: 80,
    organization_admin: 60,
    designer: 40,
    viewer: 20
};
// Default permissions by role
exports.DEFAULT_PERMISSIONS = {
    super_admin: Object.values(exports.PermissionEnum.enum),
    organization_owner: [
        'organization.view',
        'organization.edit',
        'organization.billing',
        'user.view',
        'user.create',
        'user.edit',
        'user.delete',
        'menu.view',
        'menu.create',
        'menu.edit',
        'menu.delete',
        'menu.publish',
        'device.view',
        'device.create',
        'device.edit',
        'device.delete',
        'device.control',
        'analytics.view',
        'analytics.export',
        'template.view',
        'template.create',
        'template.edit',
        'template.delete'
    ],
    organization_admin: [
        'organization.view',
        'user.view',
        'user.create',
        'user.edit',
        'menu.view',
        'menu.create',
        'menu.edit',
        'menu.delete',
        'menu.publish',
        'device.view',
        'device.create',
        'device.edit',
        'device.control',
        'analytics.view',
        'template.view',
        'template.create',
        'template.edit'
    ],
    designer: [
        'menu.view',
        'menu.create',
        'menu.edit',
        'device.view',
        'analytics.view',
        'template.view',
        'template.create'
    ],
    viewer: [
        'menu.view',
        'device.view',
        'analytics.view',
        'template.view'
    ]
};
// Helper functions
function hasPermission(user, permission) {
    if (user.role === 'super_admin')
        return true;
    return user.permissions.includes(permission) ||
        exports.DEFAULT_PERMISSIONS[user.role]?.includes(permission) || false;
}
function hasRole(user, requiredRole) {
    return exports.ROLE_HIERARCHY[user.role] >= exports.ROLE_HIERARCHY[requiredRole];
}
function canManageUser(manager, targetUser) {
    if (manager.role === 'super_admin')
        return true;
    if (manager.organizationId !== targetUser.organizationId)
        return false;
    return exports.ROLE_HIERARCHY[manager.role] > exports.ROLE_HIERARCHY[targetUser.role];
}
//# sourceMappingURL=user.types.js.map