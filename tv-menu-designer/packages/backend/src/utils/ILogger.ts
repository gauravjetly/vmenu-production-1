/**
 * Logger Interface
 * Defines the contract for logging throughout the application
 */
export interface ILogger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error: Error, meta?: any): void;
  debug(message: string, meta?: any): void;
  
  // For request tracking
  setCorrelationId(correlationId: string): void;
  getCorrelationId(): string | undefined;
}