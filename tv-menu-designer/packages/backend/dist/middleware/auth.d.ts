import { Request, Response, NextFunction } from 'express';
import { AuthUser } from '../types/auth';
export interface AuthRequest extends Request {
    user?: AuthUser;
    token?: string;
}
export declare function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function authorize(...roles: string[]): (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare function requirePermission(permission: string): (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map