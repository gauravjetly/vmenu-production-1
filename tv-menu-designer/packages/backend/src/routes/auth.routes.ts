import { Router } from 'express';
import { z } from 'zod';
import { authRateLimiter } from '../middleware/rateLimiter';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Validation schemas
const loginSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    password: z.string().min(6)
  }).refine(data => data.email || data.username, {
    message: "Either email or username must be provided"
  })
});

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    organizationName: z.string().min(1).optional()
  })
});

const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string()
  })
});

// Routes
router.post('/login', authRateLimiter, validateRequest(loginSchema), authController.login);
router.post('/register', authRateLimiter, validateRequest(registerSchema), authController.register);
router.post('/refresh', validateRequest(refreshSchema), authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);

export { router as authRoutes };