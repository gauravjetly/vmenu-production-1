import DOMPurify from 'isomorphic-dompurify';

/**
 * Input Sanitization Utilities
 * Prevents XSS and other injection attacks
 */

/**
 * Sanitize HTML input to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
    ALLOWED_ATTR: ['href', 'target']
  });
}

/**
 * Sanitize plain text input
 */
export function sanitizeInput(input: string): string {
  // Remove any HTML tags
  const cleaned = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  
  // Trim whitespace
  return cleaned.trim();
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string {
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
export function sanitizeUuid(uuid: string): string {
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
export function sanitizeFileName(fileName: string): string {
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
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    
    return parsed.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
}

/**
 * Sanitize JSON object (removes any potentially dangerous keys)
 */
export function sanitizeJson(obj: any): any {
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
  
  function clean(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }
    
    if (Array.isArray(value)) {
      return value.map(clean);
    }
    
    if (typeof value === 'object') {
      const cleaned: any = {};
      
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