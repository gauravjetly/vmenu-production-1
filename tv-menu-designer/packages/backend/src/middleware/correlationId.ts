import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runWithCorrelationId } from '../utils/LoggerImpl';

/**
 * Correlation ID Middleware
 * Adds a unique correlation ID to each request for tracking
 */
export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get correlation ID from header or generate new one
  const correlationId = req.headers['x-correlation-id'] as string || uuidv4();
  
  // Add to request object
  (req as any).correlationId = correlationId;
  
  // Add to response headers
  res.setHeader('X-Correlation-Id', correlationId);
  
  // Run the rest of the request handling with correlation ID context
  runWithCorrelationId(correlationId, () => {
    next();
  });
}