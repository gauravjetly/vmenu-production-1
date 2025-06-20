import rateLimit from 'express-rate-limit';
import { config } from '../config';

// More lenient rate limiting for development
const maxRequests = config.isDevelopment ? 1000 : config.rateLimit.maxRequests;
const windowMs = config.isDevelopment ? 60000 : config.rateLimit.windowMs; // 1 minute in dev, 15 minutes in prod

export const rateLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for successful requests in development
  skip: (req) => config.isDevelopment && req.ip === '127.0.0.1' || req.ip === '::1'
});

// Stricter rate limiter for auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
});