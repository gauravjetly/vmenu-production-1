import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
/**
 * Refactored Menu Controller
 * Uses clean architecture with use cases
 */
export declare function getMenus(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getMenuById(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createMenu(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateMenu(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function publishMenu(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteMenu(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getPublishedMenu(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=menu.controller.d.ts.map