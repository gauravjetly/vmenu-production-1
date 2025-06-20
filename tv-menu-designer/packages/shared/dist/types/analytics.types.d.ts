import { z } from 'zod';
export declare const EventTypeEnum: z.ZodEnum<["device.connected", "device.disconnected", "device.error", "device.command", "menu.displayed", "menu.error", "menu.interaction", "page.view", "page.duration", "page.transition", "item.view", "item.click", "item.hover", "system.startup", "system.shutdown", "system.error", "system.update"]>;
export declare const AnalyticsEventSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    deviceId: z.ZodString;
    menuId: z.ZodNullable<z.ZodString>;
    sessionId: z.ZodString;
    eventType: z.ZodEnum<["device.connected", "device.disconnected", "device.error", "device.command", "menu.displayed", "menu.error", "menu.interaction", "page.view", "page.duration", "page.transition", "item.view", "item.click", "item.hover", "system.startup", "system.shutdown", "system.error", "system.update"]>;
    timestamp: z.ZodString;
    data: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    metadata: z.ZodOptional<z.ZodObject<{
        ip: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            latitude: z.ZodOptional<z.ZodNumber>;
            longitude: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        }, {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        location?: {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        } | undefined;
        ip?: string | undefined;
        userAgent?: string | undefined;
    }, {
        location?: {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        } | undefined;
        ip?: string | undefined;
        userAgent?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    data: Record<string, any>;
    organizationId: string;
    deviceId: string;
    timestamp: string;
    menuId: string | null;
    sessionId: string;
    eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
    metadata?: {
        location?: {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        } | undefined;
        ip?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
}, {
    id: string;
    organizationId: string;
    deviceId: string;
    timestamp: string;
    menuId: string | null;
    sessionId: string;
    eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
    metadata?: {
        location?: {
            country?: string | undefined;
            city?: string | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
        } | undefined;
        ip?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
    data?: Record<string, any> | undefined;
}>;
export declare const MetricsSchema: z.ZodObject<{
    organizationId: z.ZodString;
    period: z.ZodEnum<["hour", "day", "week", "month", "year"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    metrics: z.ZodObject<{
        devices: z.ZodObject<{
            total: z.ZodNumber;
            online: z.ZodNumber;
            offline: z.ZodNumber;
            activeHours: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        }, {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        }>;
        menus: z.ZodObject<{
            totalViews: z.ZodNumber;
            uniqueDevices: z.ZodNumber;
            avgViewDuration: z.ZodNumber;
            popularMenus: z.ZodArray<z.ZodObject<{
                menuId: z.ZodString;
                menuName: z.ZodString;
                views: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                menuId: string;
                menuName: string;
                views: number;
            }, {
                menuId: string;
                menuName: string;
                views: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        }, {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        }>;
        pages: z.ZodObject<{
            totalViews: z.ZodNumber;
            avgDuration: z.ZodNumber;
            bounceRate: z.ZodNumber;
            popularPages: z.ZodArray<z.ZodObject<{
                pageId: z.ZodString;
                pageName: z.ZodString;
                views: z.ZodNumber;
                avgDuration: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }, {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        }, {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        }>;
        items: z.ZodObject<{
            totalInteractions: z.ZodNumber;
            clickThroughRate: z.ZodNumber;
            popularItems: z.ZodArray<z.ZodObject<{
                itemId: z.ZodString;
                itemName: z.ZodString;
                itemType: z.ZodString;
                interactions: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }, {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        }, {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        }>;
        performance: z.ZodObject<{
            avgLoadTime: z.ZodNumber;
            errorRate: z.ZodNumber;
            uptime: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        }, {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        pages: {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        };
        devices: {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        };
        menus: {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        };
        items: {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        };
        performance: {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        };
    }, {
        pages: {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        };
        devices: {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        };
        menus: {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        };
        items: {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        };
        performance: {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    metrics: {
        pages: {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        };
        devices: {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        };
        menus: {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        };
        items: {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        };
        performance: {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        };
    };
    period: "hour" | "day" | "week" | "month" | "year";
    startDate: string;
    endDate: string;
}, {
    organizationId: string;
    metrics: {
        pages: {
            totalViews: number;
            avgDuration: number;
            bounceRate: number;
            popularPages: {
                views: number;
                avgDuration: number;
                pageId: string;
                pageName: string;
            }[];
        };
        devices: {
            online: number;
            offline: number;
            total: number;
            activeHours: number;
        };
        menus: {
            totalViews: number;
            uniqueDevices: number;
            avgViewDuration: number;
            popularMenus: {
                menuId: string;
                menuName: string;
                views: number;
            }[];
        };
        items: {
            totalInteractions: number;
            clickThroughRate: number;
            popularItems: {
                itemId: string;
                itemName: string;
                itemType: string;
                interactions: number;
            }[];
        };
        performance: {
            uptime: number;
            avgLoadTime: number;
            errorRate: number;
        };
    };
    period: "hour" | "day" | "week" | "month" | "year";
    startDate: string;
    endDate: string;
}>;
export declare const DashboardDataSchema: z.ZodObject<{
    organizationId: z.ZodString;
    timestamp: z.ZodString;
    realtime: z.ZodObject<{
        activeDevices: z.ZodNumber;
        currentViewers: z.ZodNumber;
        recentEvents: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodString;
            deviceId: z.ZodString;
            menuId: z.ZodNullable<z.ZodString>;
            sessionId: z.ZodString;
            eventType: z.ZodEnum<["device.connected", "device.disconnected", "device.error", "device.command", "menu.displayed", "menu.error", "menu.interaction", "page.view", "page.duration", "page.transition", "item.view", "item.click", "item.hover", "system.startup", "system.shutdown", "system.error", "system.update"]>;
            timestamp: z.ZodString;
            data: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
            metadata: z.ZodOptional<z.ZodObject<{
                ip: z.ZodOptional<z.ZodString>;
                userAgent: z.ZodOptional<z.ZodString>;
                location: z.ZodOptional<z.ZodObject<{
                    country: z.ZodOptional<z.ZodString>;
                    city: z.ZodOptional<z.ZodString>;
                    latitude: z.ZodOptional<z.ZodNumber>;
                    longitude: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                }, {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            }, {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            data: Record<string, any>;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
        }, {
            id: string;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
            data?: Record<string, any> | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        activeDevices: number;
        currentViewers: number;
        recentEvents: {
            id: string;
            data: Record<string, any>;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
        }[];
    }, {
        activeDevices: number;
        currentViewers: number;
        recentEvents: {
            id: string;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
            data?: Record<string, any> | undefined;
        }[];
    }>;
    summary: z.ZodObject<{
        today: z.ZodObject<{
            views: z.ZodNumber;
            devices: z.ZodNumber;
            interactions: z.ZodNumber;
            errors: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }>;
        yesterday: z.ZodObject<{
            views: z.ZodNumber;
            devices: z.ZodNumber;
            interactions: z.ZodNumber;
            errors: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }>;
        weekToDate: z.ZodObject<{
            views: z.ZodNumber;
            devices: z.ZodNumber;
            interactions: z.ZodNumber;
            errors: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }, {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        today: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        yesterday: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        weekToDate: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
    }, {
        today: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        yesterday: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        weekToDate: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
    }>;
    alerts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["error", "warning", "info"]>;
        message: z.ZodString;
        deviceId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        type: "error" | "warning" | "info";
        timestamp: string;
        deviceId?: string | undefined;
    }, {
        id: string;
        message: string;
        type: "error" | "warning" | "info";
        timestamp: string;
        deviceId?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    timestamp: string;
    realtime: {
        activeDevices: number;
        currentViewers: number;
        recentEvents: {
            id: string;
            data: Record<string, any>;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
        }[];
    };
    summary: {
        today: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        yesterday: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        weekToDate: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
    };
    alerts: {
        id: string;
        message: string;
        type: "error" | "warning" | "info";
        timestamp: string;
        deviceId?: string | undefined;
    }[];
}, {
    organizationId: string;
    timestamp: string;
    realtime: {
        activeDevices: number;
        currentViewers: number;
        recentEvents: {
            id: string;
            organizationId: string;
            deviceId: string;
            timestamp: string;
            menuId: string | null;
            sessionId: string;
            eventType: "device.connected" | "device.disconnected" | "device.error" | "device.command" | "menu.displayed" | "menu.error" | "menu.interaction" | "page.view" | "page.duration" | "page.transition" | "item.view" | "item.click" | "item.hover" | "system.startup" | "system.shutdown" | "system.error" | "system.update";
            metadata?: {
                location?: {
                    country?: string | undefined;
                    city?: string | undefined;
                    latitude?: number | undefined;
                    longitude?: number | undefined;
                } | undefined;
                ip?: string | undefined;
                userAgent?: string | undefined;
            } | undefined;
            data?: Record<string, any> | undefined;
        }[];
    };
    summary: {
        today: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        yesterday: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
        weekToDate: {
            errors: number;
            devices: number;
            views: number;
            interactions: number;
        };
    };
    alerts: {
        id: string;
        message: string;
        type: "error" | "warning" | "info";
        timestamp: string;
        deviceId?: string | undefined;
    }[];
}>;
export declare const ReportSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["performance", "usage", "engagement", "custom"]>;
    period: z.ZodObject<{
        start: z.ZodString;
        end: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>;
    filters: z.ZodOptional<z.ZodObject<{
        deviceIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        menuIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        locations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        deviceIds?: string[] | undefined;
        menuIds?: string[] | undefined;
        locations?: string[] | undefined;
    }, {
        deviceIds?: string[] | undefined;
        menuIds?: string[] | undefined;
        locations?: string[] | undefined;
    }>>;
    data: z.ZodObject<{
        organizationId: z.ZodString;
        period: z.ZodEnum<["hour", "day", "week", "month", "year"]>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        metrics: z.ZodObject<{
            devices: z.ZodObject<{
                total: z.ZodNumber;
                online: z.ZodNumber;
                offline: z.ZodNumber;
                activeHours: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            }, {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            }>;
            menus: z.ZodObject<{
                totalViews: z.ZodNumber;
                uniqueDevices: z.ZodNumber;
                avgViewDuration: z.ZodNumber;
                popularMenus: z.ZodArray<z.ZodObject<{
                    menuId: z.ZodString;
                    menuName: z.ZodString;
                    views: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    menuId: string;
                    menuName: string;
                    views: number;
                }, {
                    menuId: string;
                    menuName: string;
                    views: number;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            }, {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            }>;
            pages: z.ZodObject<{
                totalViews: z.ZodNumber;
                avgDuration: z.ZodNumber;
                bounceRate: z.ZodNumber;
                popularPages: z.ZodArray<z.ZodObject<{
                    pageId: z.ZodString;
                    pageName: z.ZodString;
                    views: z.ZodNumber;
                    avgDuration: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }, {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            }, {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            }>;
            items: z.ZodObject<{
                totalInteractions: z.ZodNumber;
                clickThroughRate: z.ZodNumber;
                popularItems: z.ZodArray<z.ZodObject<{
                    itemId: z.ZodString;
                    itemName: z.ZodString;
                    itemType: z.ZodString;
                    interactions: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }, {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            }, {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            }>;
            performance: z.ZodObject<{
                avgLoadTime: z.ZodNumber;
                errorRate: z.ZodNumber;
                uptime: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            }, {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        }, {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        organizationId: string;
        metrics: {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        };
        period: "hour" | "day" | "week" | "month" | "year";
        startDate: string;
        endDate: string;
    }, {
        organizationId: string;
        metrics: {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        };
        period: "hour" | "day" | "week" | "month" | "year";
        startDate: string;
        endDate: string;
    }>;
    format: z.ZodEnum<["pdf", "csv", "json"]>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "custom" | "performance" | "usage" | "engagement";
    name: string;
    createdAt: string;
    data: {
        organizationId: string;
        metrics: {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        };
        period: "hour" | "day" | "week" | "month" | "year";
        startDate: string;
        endDate: string;
    };
    organizationId: string;
    createdBy: string;
    period: {
        start: string;
        end: string;
    };
    format: "pdf" | "csv" | "json";
    filters?: {
        deviceIds?: string[] | undefined;
        menuIds?: string[] | undefined;
        locations?: string[] | undefined;
    } | undefined;
}, {
    id: string;
    type: "custom" | "performance" | "usage" | "engagement";
    name: string;
    createdAt: string;
    data: {
        organizationId: string;
        metrics: {
            pages: {
                totalViews: number;
                avgDuration: number;
                bounceRate: number;
                popularPages: {
                    views: number;
                    avgDuration: number;
                    pageId: string;
                    pageName: string;
                }[];
            };
            devices: {
                online: number;
                offline: number;
                total: number;
                activeHours: number;
            };
            menus: {
                totalViews: number;
                uniqueDevices: number;
                avgViewDuration: number;
                popularMenus: {
                    menuId: string;
                    menuName: string;
                    views: number;
                }[];
            };
            items: {
                totalInteractions: number;
                clickThroughRate: number;
                popularItems: {
                    itemId: string;
                    itemName: string;
                    itemType: string;
                    interactions: number;
                }[];
            };
            performance: {
                uptime: number;
                avgLoadTime: number;
                errorRate: number;
            };
        };
        period: "hour" | "day" | "week" | "month" | "year";
        startDate: string;
        endDate: string;
    };
    organizationId: string;
    createdBy: string;
    period: {
        start: string;
        end: string;
    };
    format: "pdf" | "csv" | "json";
    filters?: {
        deviceIds?: string[] | undefined;
        menuIds?: string[] | undefined;
        locations?: string[] | undefined;
    } | undefined;
}>;
export type EventType = z.infer<typeof EventTypeEnum>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type Metrics = z.infer<typeof MetricsSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type Report = z.infer<typeof ReportSchema>;
export declare function calculateEngagementRate(views: number, interactions: number): number;
export declare function calculateUptimePercentage(totalTime: number, downtime: number): number;
export declare function formatDuration(seconds: number): string;
export declare function getMetricTrend(current: number, previous: number): {
    trend: 'up' | 'down' | 'stable';
    percentage: number;
};
//# sourceMappingURL=analytics.types.d.ts.map