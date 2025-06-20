import { z } from 'zod';

// User role enum
export const UserRoleEnum = z.enum([
  'super_admin',
  'organization_owner',
  'organization_admin',
  'designer',
  'viewer'
]);

// User status enum
export const UserStatusEnum = z.enum(['active', 'inactive', 'pending', 'suspended']);

// Permission enum
export const PermissionEnum = z.enum([
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
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(50).optional(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  role: UserRoleEnum,
  status: UserStatusEnum,
  organizationId: z.string().uuid().nullable(),
  permissions: z.array(PermissionEnum).default([]),
  profile: z.object({
    avatar: z.string().url().optional(),
    phone: z.string().optional(),
    timezone: z.string().default('UTC'),
    language: z.string().default('en'),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      sms: z.boolean().default(false)
    }).default({})
  }).default({}),
  metadata: z.object({
    lastLogin: z.string().datetime().nullable().default(null),
    loginCount: z.number().default(0),
    failedLoginAttempts: z.number().default(0),
    passwordChangedAt: z.string().datetime().nullable().default(null),
    emailVerified: z.boolean().default(false),
    emailVerifiedAt: z.string().datetime().nullable().default(null),
    twoFactorEnabled: z.boolean().default(false)
  }).default({
    lastLogin: null,
    loginCount: 0,
    failedLoginAttempts: 0,
    passwordChangedAt: null,
    emailVerified: false,
    emailVerifiedAt: null,
    twoFactorEnabled: false
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// User creation schema
export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  role: UserRoleEnum.optional(),
  organizationId: z.string().uuid().optional()
});

// User update schema
export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  email: true,
  createdAt: true
});

// Session schema
export const SessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  refreshToken: z.string().optional(),
  deviceInfo: z.object({
    userAgent: z.string(),
    ip: z.string(),
    location: z.string().optional()
  }).optional(),
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

// API key schema
export const ApiKeySchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string().min(1).max(100),
  key: z.string().min(32),
  permissions: z.array(PermissionEnum),
  expiresAt: z.string().datetime().nullable(),
  lastUsedAt: z.string().datetime().nullable(),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
  revokedAt: z.string().datetime().nullable()
});

// Type exports
export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type Permission = z.infer<typeof PermissionEnum>;
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type ApiKey = z.infer<typeof ApiKeySchema>;

// Role hierarchy
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 100,
  organization_owner: 80,
  organization_admin: 60,
  designer: 40,
  viewer: 20
};

// Default permissions by role
export const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: Object.values(PermissionEnum.enum) as Permission[],
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
export function hasPermission(user: User, permission: Permission): boolean {
  if (user.role === 'super_admin') return true;
  return user.permissions.includes(permission) || 
         DEFAULT_PERMISSIONS[user.role]?.includes(permission) || false;
}

export function hasRole(user: User, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[requiredRole];
}

export function canManageUser(manager: User, targetUser: User): boolean {
  if (manager.role === 'super_admin') return true;
  if (manager.organizationId !== targetUser.organizationId) return false;
  return ROLE_HIERARCHY[manager.role] > ROLE_HIERARCHY[targetUser.role];
}