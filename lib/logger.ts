interface LogEvent {
  level: 'info' | 'warn' | 'error'
  message: string
  meta?: Record<string, any>
  timestamp: string
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development'
  
  private log(level: LogEvent['level'], message: string, meta?: Record<string, any>) {
    const event: LogEvent = {
      level,
      message,
      meta,
      timestamp: new Date().toISOString()
    }
    
    if (this.isDev) {
      // In development, use console
      const logFn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
      logFn(`[${level.toUpperCase()}] ${message}`, meta || '')
    } else {
      // In production, send to monitoring service
      this.sendToMonitoring(event)
    }
  }
  
  info(message: string, meta?: Record<string, any>) {
    this.log('info', message, meta)
  }
  
  warn(message: string, meta?: Record<string, any>) {
    this.log('warn', message, meta)
  }
  
  error(message: string, meta?: Record<string, any>) {
    this.log('error', message, meta)
  }
  
  private sendToMonitoring(event: LogEvent) {
    // In production, send to your monitoring service
    // For now, just console log with structured format
    console.log(JSON.stringify(event))
  }
}

export const logger = new Logger()

// Client-side error tracking
export const trackError = (error: Error, context?: string) => {
  logger.error('Client error', {
    error: error.message,
    stack: error.stack,
    context,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  })
}

// Performance tracking
export const trackPerformance = (name: string, duration: number, meta?: Record<string, any>) => {
  logger.info('Performance metric', {
    metric: name,
    duration,
    ...meta
  })
}