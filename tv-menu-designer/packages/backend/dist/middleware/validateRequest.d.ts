import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
export declare function validateRequest(schema: AnyZodObject): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validateRequest.d.ts.map