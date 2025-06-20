import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function login(req: Request, res: Response): Promise<void>;
export declare function register(req: Request, res: Response): Promise<void>;
export declare function refresh(req: Request, res: Response): Promise<void>;
export declare function logout(req: AuthRequest, res: Response): Promise<void>;
export declare function getCurrentUser(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.old.d.ts.map