import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getMenus(req: AuthRequest, res: Response): Promise<void>;
export declare function getMenuById(req: AuthRequest, res: Response): Promise<void>;
export declare function createMenu(req: AuthRequest, res: Response): Promise<void>;
export declare function updateMenu(req: AuthRequest, res: Response): Promise<void>;
export declare function publishMenu(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteMenu(req: AuthRequest, res: Response): Promise<void>;
export declare function getPublishedMenu(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=menu.controller.old.d.ts.map