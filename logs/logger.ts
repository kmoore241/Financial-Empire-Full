/* src/logs/logger.ts */
export type LogMeta = Record<string, unknown>;

type Level = "error" | "warn" | "info";

function makePayload(level: Level, message: string, meta?: LogMeta, err?: unknown) {
  return {
    level,
    message,
    meta,
    error:
      err instanceof Error
        ? { name: err.name, message: err.message, stack: err.stack }
        : undefined,
    timestamp: new Date().toISOString(),
  };
}

export function logError(message: string, meta?: LogMeta, err?: unknown) {
  // Always log locally
  // eslint-disable-next-line no-console
  console.error(message, meta, err);

  // Optional: forward to an API if configured (works client or server)
  const endpoint = process.env.NEXT_PUBLIC_LOG_API;
  if (endpoint && typeof fetch !== "undefined") {
    try {
      fetch(`${endpoint}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(makePayload("error", message, meta, err)),
        // keepalive lets the browser send the request on page unloads
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* swallow */
    }
  }
}

export function logWarn(message: string, meta?: LogMeta) {
  // eslint-disable-next-line no-console
  console.warn(message, meta);
}

export function logInfo(message: string, meta?: LogMeta) {
  // eslint-disable-next-line no-console
  console.info(message, meta);
}
