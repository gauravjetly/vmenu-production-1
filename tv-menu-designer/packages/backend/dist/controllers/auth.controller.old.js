"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.refresh = refresh;
exports.logout = logout;
exports.getCurrentUser = getCurrentUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const errorHandler_1 = require("../middleware/errorHandler");
const redis_1 = require("../config/redis");
const logger_1 = require("../utils/logger");
async function login(req, res) {
    const { email, password } = req.body;
    try {
        // TODO: Fetch user from database
        // For now, using demo credentials
        if (email !== 'demo@tvmenudesigner.com' || password !== 'demo123456') {
            throw new errorHandler_1.AppError('Invalid credentials', 401);
        }
        const user = {
            id: (0, uuid_1.v4)(),
            email,
            firstName: 'Demo',
            lastName: 'User',
            role: 'organization_owner',
            organizationId: (0, uuid_1.v4)()
        };
        // Generate tokens
        const token = jsonwebtoken_1.default.sign({ userId: user.id, organizationId: user.organizationId }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        // Cache user data
        await redis_1.cache.set(`user:${user.id}`, user, 3600); // 1 hour
        res.json({
            success: true,
            data: {
                user,
                token,
                refreshToken
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Login error:', error);
        throw error;
    }
}
async function register(req, res) {
    const { email, password, firstName, lastName, organizationName } = req.body;
    try {
        // TODO: Check if user exists in database
        // TODO: Create organization
        // TODO: Create user
        const organizationId = (0, uuid_1.v4)();
        const userId = (0, uuid_1.v4)();
        const user = {
            id: userId,
            email,
            firstName,
            lastName,
            role: 'organization_owner',
            organizationId
        };
        // Generate tokens
        const token = jsonwebtoken_1.default.sign({ userId: user.id, organizationId }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        // Cache user data
        await redis_1.cache.set(`user:${user.id}`, user, 3600);
        res.status(201).json({
            success: true,
            data: {
                user,
                token,
                refreshToken
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Registration error:', error);
        throw error;
    }
}
async function refresh(req, res) {
    const { refreshToken } = req.body;
    try {
        // Verify refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwt.refreshSecret);
        // TODO: Fetch user from database
        const user = await redis_1.cache.get(`user:${decoded.userId}`);
        if (!user) {
            throw new errorHandler_1.AppError('User not found', 401);
        }
        // Generate new access token
        const token = jsonwebtoken_1.default.sign({ userId: decoded.userId, organizationId: user.organizationId }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        res.json({
            success: true,
            data: { token }
        });
    }
    catch (error) {
        logger_1.logger.error('Token refresh error:', error);
        throw new errorHandler_1.AppError('Invalid refresh token', 401);
    }
}
async function logout(req, res) {
    try {
        // Blacklist the token
        if (req.token) {
            const decoded = jsonwebtoken_1.default.decode(req.token);
            const ttl = decoded.exp - Math.floor(Date.now() / 1000);
            if (ttl > 0) {
                await redis_1.cache.set(`blacklist:${req.token}`, true, ttl);
            }
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        logger_1.logger.error('Logout error:', error);
        throw error;
    }
}
async function getCurrentUser(req, res) {
    res.json({
        success: true,
        data: { user: req.user }
    });
}
//# sourceMappingURL=auth.controller.old.js.map