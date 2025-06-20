import { createClient, RedisClientType } from 'redis';
import { config } from '.';
import { logger } from '../utils/logger';

let redisClient: RedisClientType;
let pubClient: RedisClientType;
let subClient: RedisClientType;

export async function initializeRedis() {
  const redisConfig = {
    socket: {
      host: config.redis.host,
      port: config.redis.port
    },
    password: config.redis.password || undefined,
    database: config.redis.db
  };

  // Main client for general operations
  redisClient = createClient(redisConfig);
  
  // Pub/Sub clients for real-time features
  pubClient = createClient(redisConfig);
  subClient = createClient(redisConfig);

  // Error handlers
  redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
  pubClient.on('error', (err) => logger.error('Redis Pub Client Error:', err));
  subClient.on('error', (err) => logger.error('Redis Sub Client Error:', err));

  // Connect all clients
  await Promise.all([
    redisClient.connect(),
    pubClient.connect(),
    subClient.connect()
  ]);

  logger.info('Redis clients connected');
}

export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
}

export function getPubClient(): RedisClientType {
  if (!pubClient) {
    throw new Error('Redis pub client not initialized');
  }
  return pubClient;
}

export function getSubClient(): RedisClientType {
  if (!subClient) {
    throw new Error('Redis sub client not initialized');
  }
  return subClient;
}

export async function closeRedis() {
  await Promise.all([
    redisClient?.quit(),
    pubClient?.quit(),
    subClient?.quit()
  ]);
}

// Cache utilities
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await redisClient.setEx(key, ttl, serialized);
    } else {
      await redisClient.set(key, serialized);
    }
  },

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  },

  async exists(key: string): Promise<boolean> {
    return (await redisClient.exists(key)) === 1;
  },

  async clear(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
};