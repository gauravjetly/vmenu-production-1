"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
exports.requirePermission = requirePermission;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errorHandler_1 = require("./errorHandler");
const redis_1 = require("../config/redis");
async function authenticate(req, res, next) {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errorHandler_1.AppError('No token provided', 401);
        }
        const token = authHeader.substring(7);
        // Check if token is blacklisted
        const isBlacklisted = await redis_1.cache.exists(`blacklist:${token}`);
        if (isBlacklisted) {
            throw new errorHandler_1.AppError('Token is invalid', 401);
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        // Get user from cache or database
        let user = await redis_1.cache.get(`user:${decoded.userId}`);
        if (!user) {
            // Fetch from database
            const { User: UserModel } = await Promise.resolve().then(() => __importStar(require('../models/User')));
            const dbUser = await UserModel.query().findById(decoded.userId);
            if (!dbUser || dbUser.status !== 'active') {
                throw new errorHandler_1.AppError('User not found or inactive', 401);
            }
            user = {
                id: dbUser.id,
                email: dbUser.email,
                username: dbUser.username,
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                role: dbUser.role,
                organizationId: dbUser.organizationId,
                permissions: dbUser.permissions
            };
            // Cache for next time
            await redis_1.cache.set(`user:${decoded.userId}`, user, 3600);
        }
        // Attach user and token to request
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new errorHandler_1.AppError('Invalid token', 401));
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new errorHandler_1.AppError('Token expired', 401));
        }
        else {
            next(error);
        }
    }
}
function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errorHandler_1.AppError('Unauthorized', 401));
        }
        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return next(new errorHandler_1.AppError('Forbidden', 403));
        }
        next();
    };
}
function requirePermission(permission) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errorHandler_1.AppError('Unauthorized', 401));
        }
        // Super admin has all permissions
        if (req.user.role === 'super_admin') {
            return next();
        }
        // Check if user has the required permission
        if (!req.user.permissions.includes(permission)) {
            return next(new errorHandler_1.AppError('Insufficient permissions', 403));
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map