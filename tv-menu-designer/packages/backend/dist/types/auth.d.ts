import { Request } from 'express';
export interface AuthUser {
    id: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    role: string;
    organizationId?: string;
    permissions: string[];
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
//# sourceMappingURL=auth.d.ts.map