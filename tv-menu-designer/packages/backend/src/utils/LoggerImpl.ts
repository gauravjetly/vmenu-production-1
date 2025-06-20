import winston from 'winston';
import path from 'path';
import { config } from '../config';
import { ILogger } from './ILogger';
import { AsyncLocalStorage } from 'async_hooks';

// AsyncLocalStorage for correlation ID tracking
const asyncLocalStorage = new AsyncLocalStorage<{ correlationId: string }>();

/**
 * Logger Implementation
 * Provides structured logging with correlation ID support
 */
class LoggerImpl implements ILogger {
  private winston: winston.Logger;

  constructor() {
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
      winston.format.json()
    );

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf((info: any) => {
            const { level, message, timestamp, ...metadata } = info;
            const correlationId = this.getCorrelationId();
            const metaStr = Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : '';
            const corrId = correlationId ? `[${correlationId}] ` : '';
            return `${timestamp} ${corrId}${level}: ${message} ${metaStr}`;
          })
        )
      })
    ];

    // Add file transport in production
    if (config.isProduction) {
      transports.push(
        new winston.transports.File({
          filename: path.join(process.cwd(), config.logging.file),
          maxsize: 10485760, // 10MB
          maxFiles: 5,
          format: logFormat
        })
      );
    }

    this.winston = winston.createLogger({
      level: config.logging.level,
      format: logFormat,
      transports,
      exitOnError: false
    });
  }

  info(message: string, meta?: any): void {
    this.winston.info(message, this.enrichMetadata(meta));
  }

  warn(message: string, meta?: any): void {
    this.winston.warn(message, this.enrichMetadata(meta));
  }

  error(message: string, error: Error, meta?: any): void {
    this.winston.error(message, this.enrichMetadata({
      ...meta,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    }));
  }

  debug(message: string, meta?: any): void {
    this.winston.debug(message, this.enrichMetadata(meta));
  }

  setCorrelationId(correlationId: string): void {
    const store = asyncLocalStorage.getStore();
    if (store) {
      store.correlationId = correlationId;
    }
  }

  getCorrelationId(): string | undefined {
    const store = asyncLocalStorage.getStore();
    return store?.correlationId;
  }

  /**
   * Run a function with a correlation ID context
   */
  static runWithCorrelationId<T>(correlationId: string, fn: () => T): T {
    return asyncLocalStorage.run({ correlationId }, fn);
  }

  private enrichMetadata(meta?: any): any {
    const correlationId = this.getCorrelationId();
    return {
      ...meta,
      correlationId
    };
  }
}

// Export singleton instance
export const loggerImpl = new LoggerImpl();

// Export the static method for running with correlation ID
export const runWithCorrelationId = LoggerImpl.runWithCorrelationId;