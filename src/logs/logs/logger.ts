import { LogEntry } from './types';
import { sendLog } from './logService';

/**
 * Determines if logs should be printed to console based on environment.
 */
function shouldLog(): boolean {
  return process.env.NODE_ENV !== 'production';
}

/**
 * Logs an info-level message.
 */
export function logInfo(message: string, data?: any) {
  if (!shouldLog()) return;
  const timestamp = new Date().toISOString();
  console.info(`[INFO] [${timestamp}] ${message}`, data ?? '');
  // Optionally forward to remote
  // sendLog({ level: 'info', message, data, timestamp });
}

/**
 * Logs a warning-level message.
 */
export function logWarn(message: string, data?: any) {
  if (!shouldLog()) return;
  const timestamp = new Date().toISOString();
  console.warn(`[WARN] [${timestamp}] ${message}`, data ?? '');
  // Optionally forward to remote
  // sendLog({ level: 'warn', message, data, timestamp });
}

/**
 * Logs an error-level message and forwards to remote service.
 */
export function logError(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  if (shouldLog()) {
    console.error(`[ERROR] [${timestamp}] ${message}`, data ?? '');
  }
  // Always send errors to remote logging service
  sendLog({ level: 'error', message, data, timestamp });
}
