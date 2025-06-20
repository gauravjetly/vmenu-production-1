import { z } from 'zod';
export declare const DeviceTypeEnum: z.ZodEnum<["display", "tablet", "mobile", "kiosk", "web"]>;
export declare const DeviceStatusEnum: z.ZodEnum<["online", "offline", "error", "maintenance"]>;
export declare const DeviceOrientationEnum: z.ZodEnum<["landscape", "portrait", "auto"]>;
export declare const DeviceSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    type: z.ZodEnum<["display", "tablet", "mobile", "kiosk", "web"]>;
    status: z.ZodEnum<["online", "offline", "error", "maintenance"]>;
    location: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodObject<{
        screenResolution: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<["landscape", "portrait", "auto"]>>;
        browser: z.ZodOptional<z.ZodString>;
        os: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
        ip: z.ZodOptional<z.ZodString>;
        lastSeen: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        version?: string | undefined;
        screenResolution?: {
            width: number;
            height: number;
        } | undefined;
        orientation?: "landscape" | "portrait" | "auto" | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        ip?: string | undefined;
        lastSeen?: string | undefined;
    }, {
        version?: string | undefined;
        screenResolution?: {
            width: number;
            height: number;
        } | undefined;
        orientation?: "landscape" | "portrait" | "auto" | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        ip?: string | undefined;
        lastSeen?: string | undefined;
    }>>;
    settings: z.ZodDefault<z.ZodObject<{
        brightness: z.ZodDefault<z.ZodNumber>;
        volume: z.ZodDefault<z.ZodNumber>;
        autoUpdate: z.ZodDefault<z.ZodBoolean>;
        sleepSchedule: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            startTime: z.ZodString;
            endTime: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            startTime: string;
            endTime: string;
        }, {
            startTime: string;
            endTime: string;
            enabled?: boolean | undefined;
        }>>;
        restartSchedule: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            time: z.ZodString;
            days: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            time: string;
            days: number[];
        }, {
            time: string;
            days: number[];
            enabled?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        brightness: number;
        volume: number;
        autoUpdate: boolean;
        sleepSchedule?: {
            enabled: boolean;
            startTime: string;
            endTime: string;
        } | undefined;
        restartSchedule?: {
            enabled: boolean;
            time: string;
            days: number[];
        } | undefined;
    }, {
        brightness?: number | undefined;
        volume?: number | undefined;
        autoUpdate?: boolean | undefined;
        sleepSchedule?: {
            startTime: string;
            endTime: string;
            enabled?: boolean | undefined;
        } | undefined;
        restartSchedule?: {
            time: string;
            days: number[];
            enabled?: boolean | undefined;
        } | undefined;
    }>>;
    assignedMenuId: z.ZodNullable<z.ZodString>;
    assignedPlaylistId: z.ZodNullable<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    lastActivityAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    code: string;
    type: "display" | "tablet" | "mobile" | "kiosk" | "web";
    status: "online" | "offline" | "error" | "maintenance";
    name: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    settings: {
        brightness: number;
        volume: number;
        autoUpdate: boolean;
        sleepSchedule?: {
            enabled: boolean;
            startTime: string;
            endTime: string;
        } | undefined;
        restartSchedule?: {
            enabled: boolean;
            time: string;
            days: number[];
        } | undefined;
    };
    organizationId: string;
    assignedMenuId: string | null;
    assignedPlaylistId: string | null;
    lastActivityAt: string | null;
    metadata?: {
        version?: string | undefined;
        screenResolution?: {
            width: number;
            height: number;
        } | undefined;
        orientation?: "landscape" | "portrait" | "auto" | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        ip?: string | undefined;
        lastSeen?: string | undefined;
    } | undefined;
    description?: string | undefined;
    location?: string | undefined;
}, {
    id: string;
    code: string;
    type: "display" | "tablet" | "mobile" | "kiosk" | "web";
    status: "online" | "offline" | "error" | "maintenance";
    name: string;
    createdAt: string;
    updatedAt: string;
    organizationId: string;
    assignedMenuId: string | null;
    assignedPlaylistId: string | null;
    lastActivityAt: string | null;
    metadata?: {
        version?: string | undefined;
        screenResolution?: {
            width: number;
            height: number;
        } | undefined;
        orientation?: "landscape" | "portrait" | "auto" | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        ip?: string | undefined;
        lastSeen?: string | undefined;
    } | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
    settings?: {
        brightness?: number | undefined;
        volume?: number | undefined;
        autoUpdate?: boolean | undefined;
        sleepSchedule?: {
            startTime: string;
            endTime: string;
            enabled?: boolean | undefined;
        } | undefined;
        restartSchedule?: {
            time: string;
            days: number[];
            enabled?: boolean | undefined;
        } | undefined;
    } | undefined;
    location?: string | undefined;
}>;
export declare const DeviceRegistrationSchema: z.ZodObject<{
    code: z.ZodString;
    deviceInfo: z.ZodObject<{
        type: z.ZodEnum<["display", "tablet", "mobile", "kiosk", "web"]>;
        name: z.ZodOptional<z.ZodString>;
        screenResolution: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        userAgent: z.ZodString;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "display" | "tablet" | "mobile" | "kiosk" | "web";
        screenResolution: {
            width: number;
            height: number;
        };
        userAgent: string;
        name?: string | undefined;
        timezone?: string | undefined;
    }, {
        type: "display" | "tablet" | "mobile" | "kiosk" | "web";
        screenResolution: {
            width: number;
            height: number;
        };
        userAgent: string;
        name?: string | undefined;
        timezone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    code: string;
    deviceInfo: {
        type: "display" | "tablet" | "mobile" | "kiosk" | "web";
        screenResolution: {
            width: number;
            height: number;
        };
        userAgent: string;
        name?: string | undefined;
        timezone?: string | undefined;
    };
}, {
    code: string;
    deviceInfo: {
        type: "display" | "tablet" | "mobile" | "kiosk" | "web";
        screenResolution: {
            width: number;
            height: number;
        };
        userAgent: string;
        name?: string | undefined;
        timezone?: string | undefined;
    };
}>;
export declare const DeviceCommandSchema: z.ZodObject<{
    id: z.ZodString;
    deviceId: z.ZodString;
    command: z.ZodEnum<["restart", "reload", "clearCache", "screenshot", "updateMenu", "updateSettings", "diagnose"]>;
    payload: z.ZodOptional<z.ZodAny>;
    status: z.ZodEnum<["pending", "sent", "acknowledged", "completed", "failed"]>;
    createdAt: z.ZodString;
    sentAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    result: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sent" | "acknowledged" | "completed" | "failed";
    createdAt: string;
    deviceId: string;
    command: "restart" | "reload" | "clearCache" | "screenshot" | "updateMenu" | "updateSettings" | "diagnose";
    sentAt: string | null;
    completedAt: string | null;
    error?: string | undefined;
    payload?: any;
    result?: any;
}, {
    id: string;
    status: "pending" | "sent" | "acknowledged" | "completed" | "failed";
    createdAt: string;
    deviceId: string;
    command: "restart" | "reload" | "clearCache" | "screenshot" | "updateMenu" | "updateSettings" | "diagnose";
    sentAt: string | null;
    completedAt: string | null;
    error?: string | undefined;
    payload?: any;
    result?: any;
}>;
export declare const DeviceMetricsSchema: z.ZodObject<{
    deviceId: z.ZodString;
    timestamp: z.ZodString;
    metrics: z.ZodObject<{
        cpu: z.ZodOptional<z.ZodNumber>;
        memory: z.ZodOptional<z.ZodNumber>;
        storage: z.ZodOptional<z.ZodNumber>;
        temperature: z.ZodOptional<z.ZodNumber>;
        uptime: z.ZodOptional<z.ZodNumber>;
        fps: z.ZodOptional<z.ZodNumber>;
        networkLatency: z.ZodOptional<z.ZodNumber>;
        errors: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        errors: number;
        cpu?: number | undefined;
        memory?: number | undefined;
        storage?: number | undefined;
        temperature?: number | undefined;
        uptime?: number | undefined;
        fps?: number | undefined;
        networkLatency?: number | undefined;
    }, {
        cpu?: number | undefined;
        memory?: number | undefined;
        storage?: number | undefined;
        temperature?: number | undefined;
        uptime?: number | undefined;
        fps?: number | undefined;
        networkLatency?: number | undefined;
        errors?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    deviceId: string;
    timestamp: string;
    metrics: {
        errors: number;
        cpu?: number | undefined;
        memory?: number | undefined;
        storage?: number | undefined;
        temperature?: number | undefined;
        uptime?: number | undefined;
        fps?: number | undefined;
        networkLatency?: number | undefined;
    };
}, {
    deviceId: string;
    timestamp: string;
    metrics: {
        cpu?: number | undefined;
        memory?: number | undefined;
        storage?: number | undefined;
        temperature?: number | undefined;
        uptime?: number | undefined;
        fps?: number | undefined;
        networkLatency?: number | undefined;
        errors?: number | undefined;
    };
}>;
export type DeviceType = z.infer<typeof DeviceTypeEnum>;
export type DeviceStatus = z.infer<typeof DeviceStatusEnum>;
export type DeviceOrientation = z.infer<typeof DeviceOrientationEnum>;
export type Device = z.infer<typeof DeviceSchema>;
export type DeviceRegistration = z.infer<typeof DeviceRegistrationSchema>;
export type DeviceCommand = z.infer<typeof DeviceCommandSchema>;
export type DeviceMetrics = z.infer<typeof DeviceMetricsSchema>;
export declare function generateDeviceCode(): string;
export declare function isDeviceOnline(device: Device): boolean;
//# sourceMappingURL=device.types.d.ts.map