"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtml = sanitizeHtml;
exports.sanitizeInput = sanitizeInput;
exports.sanitizeEmail = sanitizeEmail;
exports.sanitizeUuid = sanitizeUuid;
exports.sanitizeFileName = sanitizeFileName;
exports.sanitizeUrl = sanitizeUrl;
exports.sanitizeJson = sanitizeJson;
const isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
/**
 * Input Sanitization Utilities
 * Prevents XSS and other injection attacks
 */
/**
 * Sanitize HTML input to prevent XSS
 */
function sanitizeHtml(input) {
    return isomorphic_dompurify_1.default.sanitize(input, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
        ALLOWED_ATTR: ['href', 'target']
    });
}
/**
 * Sanitize plain text input
 */
function sanitizeInput(input) {
    // Remove any HTML tags
    const cleaned = isomorphic_dompurify_1.default.sanitize(input, { ALLOWED_TAGS: [] });
    // Trim whitespace
    return cleaned.trim();
}
/**
 * Validate and sanitize email
 */
function sanitizeEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleaned = email.toLowerCase().trim();
    if (!emailRegex.test(cleaned)) {
        throw new Error('Invalid email format');
    }
    return cleaned;
}
/**
 * Validate and sanitize UUID
 */
function sanitizeUuid(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const cleaned = uuid.toLowerCase().trim();
    if (!uuidRegex.test(cleaned)) {
        throw new Error('Invalid UUID format');
    }
    return cleaned;
}
/**
 * Sanitize file name
 */
function sanitizeFileName(fileName) {
    // Remove path traversal attempts
    let cleaned = fileName.replace(/[\/\\]/g, '');
    // Remove special characters except dots and hyphens
    cleaned = cleaned.replace(/[^a-zA-Z0-9.-]/g, '_');
    // Ensure it doesn't start with a dot
    if (cleaned.startsWith('.')) {
        cleaned = '_' + cleaned.substring(1);
    }
    return cleaned;
}
/**
 * Validate and sanitize URL
 */
function sanitizeUrl(url) {
    try {
        const parsed = new URL(url);
        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            throw new Error('Invalid protocol');
        }
        return parsed.toString();
    }
    catch {
        throw new Error('Invalid URL format');
    }
}
/**
 * Sanitize JSON object (removes any potentially dangerous keys)
 */
function sanitizeJson(obj) {
    const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
    function clean(value) {
        if (value === null || value === undefined) {
            return value;
        }
        if (Array.isArray(value)) {
            return value.map(clean);
        }
        if (typeof value === 'object') {
            const cleaned = {};
            for (const key in value) {
                if (value.hasOwnProperty(key) && !dangerousKeys.includes(key)) {
                    cleaned[key] = clean(value[key]);
                }
            }
            return cleaned;
        }
        if (typeof value === 'string') {
            return sanitizeInput(value);
        }
        return value;
    }
    return clean(obj);
}
//# sourceMappingURL=sanitizer.js.map