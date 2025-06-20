"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
exports.initializeRedis = initializeRedis;
exports.getRedisClient = getRedisClient;
exports.getPubClient = getPubClient;
exports.getSubClient = getSubClient;
exports.closeRedis = closeRedis;
const redis_1 = require("redis");
const _1 = require(".");
const logger_1 = require("../utils/logger");
let redisClient;
let pubClient;
let subClient;
async function initializeRedis() {
    const redisConfig = {
        socket: {
            host: _1.config.redis.host,
            port: _1.config.redis.port
        },
        password: _1.config.redis.password || undefined,
        database: _1.config.redis.db
    };
    // Main client for general operations
    redisClient = (0, redis_1.createClient)(redisConfig);
    // Pub/Sub clients for real-time features
    pubClient = (0, redis_1.createClient)(redisConfig);
    subClient = (0, redis_1.createClient)(redisConfig);
    // Error handlers
    redisClient.on('error', (err) => logger_1.logger.error('Redis Client Error:', err));
    pubClient.on('error', (err) => logger_1.logger.error('Redis Pub Client Error:', err));
    subClient.on('error', (err) => logger_1.logger.error('Redis Sub Client Error:', err));
    // Connect all clients
    await Promise.all([
        redisClient.connect(),
        pubClient.connect(),
        subClient.connect()
    ]);
    logger_1.logger.info('Redis clients connected');
}
function getRedisClient() {
    if (!redisClient) {
        throw new Error('Redis client not initialized');
    }
    return redisClient;
}
function getPubClient() {
    if (!pubClient) {
        throw new Error('Redis pub client not initialized');
    }
    return pubClient;
}
function getSubClient() {
    if (!subClient) {
        throw new Error('Redis sub client not initialized');
    }
    return subClient;
}
async function closeRedis() {
    await Promise.all([
        redisClient?.quit(),
        pubClient?.quit(),
        subClient?.quit()
    ]);
}
// Cache utilities
exports.cache = {
    async get(key) {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
    },
    async set(key, value, ttl) {
        const serialized = JSON.stringify(value);
        if (ttl) {
            await redisClient.setEx(key, ttl, serialized);
        }
        else {
            await redisClient.set(key, serialized);
        }
    },
    async delete(key) {
        await redisClient.del(key);
    },
    async exists(key) {
        return (await redisClient.exists(key)) === 1;
    },
    async clear(pattern) {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    }
};
//# sourceMappingURL=redis.js.map