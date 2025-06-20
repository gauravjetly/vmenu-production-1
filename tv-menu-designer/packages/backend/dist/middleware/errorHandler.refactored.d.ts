import { Request, Response, NextFunction } from 'express';
/**
 * Enhanced Error Handler Middleware
 * Handles all types of errors with proper logging and response formatting
 */
export declare function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void;
export declare class AppError extends Error {
    message: string;
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
//# sourceMappingURL=errorHandler.refactored.d.ts.map