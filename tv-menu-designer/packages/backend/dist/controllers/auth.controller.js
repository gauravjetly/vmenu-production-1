"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.logout = logout;
exports.refreshToken = refreshToken;
exports.getMe = getMe;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const errorHandler_1 = require("../middleware/errorHandler");
const redis_1 = require("../config/redis");
const User_1 = require("../models/User");
const Organization_1 = require("../models/Organization");
const DIContainer_1 = require("../container/DIContainer");
const logger = (0, DIContainer_1.getLogger)();
async function login(req, res) {
    const { email, username, password } = req.body;
    logger.info('Login attempt', { email, username, hasPassword: !!password });
    try {
        // Find user by email or username
        let user = await User_1.User.query()
            .where(function () {
            if (email) {
                this.where('email', email);
            }
            if (username) {
                this.orWhere('username', username);
            }
        })
            .first();
        if (!user) {
            logger.warn('User not found', { email, username });
            throw new errorHandler_1.AppError('Invalid credentials', 401);
        }
        logger.info('User found', { userId: user.id, email: user.email, username: user.username });
        // Verify password
        const isValidPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValidPassword) {
            throw new errorHandler_1.AppError('Invalid credentials', 401);
        }
        // Check if user is active
        if (user.status !== 'active') {
            throw new errorHandler_1.AppError('Account is not active', 403);
        }
        // Generate tokens
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            organizationId: user.organizationId,
            role: user.role
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        // Cache user data
        const userForCache = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            organizationId: user.organizationId,
            permissions: user.permissions
        };
        await redis_1.cache.set(`user:${user.id}`, userForCache, 3600); // 1 hour
        // Update last login
        user.metadata = {
            ...user.metadata,
            lastLogin: new Date().toISOString(),
            loginCount: (user.metadata.loginCount || 0) + 1
        };
        await user.$query().patch({ metadata: user.metadata });
        logger.info('User logged in', {
            userId: user.id,
            email: user.email,
            organizationId: user.organizationId
        });
        res.json({
            success: true,
            data: {
                user: userForCache,
                token,
                refreshToken
            }
        });
    }
    catch (error) {
        logger.error('Login error', error);
        throw error;
    }
}
async function register(req, res) {
    const { email, password, firstName, lastName, organizationName } = req.body;
    try {
        // Check if user exists
        const existingUser = await User_1.User.query().where('email', email).first();
        if (existingUser) {
            throw new errorHandler_1.AppError('Email already registered', 409);
        }
        // Create organization
        const organization = await Organization_1.Organization.query().insert({
            id: (0, uuid_1.v4)(),
            name: organizationName,
            slug: organizationName.toLowerCase().replace(/\s+/g, '-'),
            plan: {
                name: 'Trial',
                features: ['basic_menus', 'single_device'],
                maxMenus: 5,
                maxDevices: 1
            },
            limits: {
                maxMenus: 5,
                maxDevices: 1,
                maxUsers: 3
            },
            status: 'trial',
            trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await User_1.User.query().insert({
            id: (0, uuid_1.v4)(),
            email,
            passwordHash,
            firstName,
            lastName,
            role: 'organization_owner',
            organizationId: organization.id,
            status: 'active'
        });
        // Generate tokens
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            organizationId: user.organizationId,
            role: user.role
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        // Cache user data
        const userForResponse = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            organizationId: user.organizationId,
            permissions: user.permissions
        };
        await redis_1.cache.set(`user:${user.id}`, userForResponse, 3600);
        logger.info('User registered', {
            userId: user.id,
            email: user.email,
            organizationId: organization.id
        });
        res.status(201).json({
            success: true,
            data: {
                user: userForResponse,
                token,
                refreshToken
            }
        });
    }
    catch (error) {
        logger.error('Registration error', error);
        throw error;
    }
}
async function logout(req, res) {
    try {
        const token = req.token;
        if (token) {
            // Add token to blacklist
            await redis_1.cache.set(`blacklist:${token}`, true, 86400); // 24 hours
            // Remove user from cache
            if (req.user?.id) {
                await redis_1.cache.delete(`user:${req.user.id}`);
            }
        }
        logger.info('User logged out', { userId: req.user?.id });
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        logger.error('Logout error', error);
        throw error;
    }
}
async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new errorHandler_1.AppError('Refresh token is required', 400);
    }
    try {
        // Verify refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwt.refreshSecret);
        // Get user from database
        const user = await User_1.User.query().findById(decoded.userId);
        if (!user || user.status !== 'active') {
            throw new errorHandler_1.AppError('Invalid refresh token', 401);
        }
        // Generate new access token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            organizationId: user.organizationId,
            role: user.role
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        logger.info('Token refreshed', { userId: user.id });
        res.json({
            success: true,
            data: { token }
        });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new errorHandler_1.AppError('Invalid refresh token', 401);
        }
        throw error;
    }
}
async function getMe(req, res) {
    const user = req.user;
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    // Get organization if user has one
    let organization = null;
    if (user.organizationId) {
        organization = await Organization_1.Organization.query().findById(user.organizationId);
    }
    res.json({
        success: true,
        data: {
            user,
            organization
        }
    });
}
//# sourceMappingURL=auth.controller.js.map