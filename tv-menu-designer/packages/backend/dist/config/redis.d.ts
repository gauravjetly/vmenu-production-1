import { RedisClientType } from 'redis';
export declare function initializeRedis(): Promise<void>;
export declare function getRedisClient(): RedisClientType;
export declare function getPubClient(): RedisClientType;
export declare function getSubClient(): RedisClientType;
export declare function closeRedis(): Promise<void>;
export declare const cache: {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    clear(pattern: string): Promise<void>;
};
//# sourceMappingURL=redis.d.ts.map