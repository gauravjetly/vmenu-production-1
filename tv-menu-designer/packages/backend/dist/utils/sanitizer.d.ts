/**
 * Input Sanitization Utilities
 * Prevents XSS and other injection attacks
 */
/**
 * Sanitize HTML input to prevent XSS
 */
export declare function sanitizeHtml(input: string): string;
/**
 * Sanitize plain text input
 */
export declare function sanitizeInput(input: string): string;
/**
 * Validate and sanitize email
 */
export declare function sanitizeEmail(email: string): string;
/**
 * Validate and sanitize UUID
 */
export declare function sanitizeUuid(uuid: string): string;
/**
 * Sanitize file name
 */
export declare function sanitizeFileName(fileName: string): string;
/**
 * Validate and sanitize URL
 */
export declare function sanitizeUrl(url: string): string;
/**
 * Sanitize JSON object (removes any potentially dangerous keys)
 */
export declare function sanitizeJson(obj: any): any;
//# sourceMappingURL=sanitizer.d.ts.map