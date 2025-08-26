/**
 * Defines the shape of a log entry.
 */
export interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  timestamp?: string;
}
