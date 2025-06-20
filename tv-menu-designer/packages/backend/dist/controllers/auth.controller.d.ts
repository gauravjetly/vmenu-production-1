import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function login(req: Request, res: Response): Promise<void>;
export declare function register(req: Request, res: Response): Promise<void>;
export declare function logout(req: AuthRequest, res: Response): Promise<void>;
export declare function refreshToken(req: Request, res: Response): Promise<void>;
export declare function getMe(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map