import { ILogger } from './ILogger';
/**
 * Logger Implementation
 * Provides structured logging with correlation ID support
 */
declare class LoggerImpl implements ILogger {
    private winston;
    constructor();
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, error: Error, meta?: any): void;
    debug(message: string, meta?: any): void;
    setCorrelationId(correlationId: string): void;
    getCorrelationId(): string | undefined;
    /**
     * Run a function with a correlation ID context
     */
    static runWithCorrelationId<T>(correlationId: string, fn: () => T): T;
    private enrichMetadata;
}
export declare const loggerImpl: LoggerImpl;
export declare const runWithCorrelationId: typeof LoggerImpl.runWithCorrelationId;
export {};
//# sourceMappingURL=LoggerImpl.d.ts.map