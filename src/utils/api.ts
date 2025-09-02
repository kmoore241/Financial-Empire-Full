// utils/api.ts
import type { ChartCandle } from '@/types';

/** Base API URL (Vite or CRA), fallback to /api */
export const BASE_URL =
  // Vite
  (typeof import.meta !== 'undefined' &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_API_BASE_URL) ??
  // CRA
  process.env.REACT_APP_API_BASE_URL ??
  '/api';

export class ApiError extends Error {
  status: number;
  statusText: string;
  data?: unknown;
  constructor(message: string, init: { status: number; statusText: string; data?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = init.status;
    this.statusText = init.statusText;
    this.data = init.data;
  }
}

/** Create a timeout-capable signal and a cleanup to clear listeners/timeouts. */
function withTimeout(
  upstream?: AbortSignal,
  ms = 15_000
): { signal: AbortSignal; cleanup: () => void } {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(new DOMException('Timeout', 'AbortError')), ms);
  const onAbort = () => ctrl.abort(upstream!.reason);

  if (upstream) upstream.addEventListener('abort', onAbort, { once: true });

  const cleanup = () => {
    clearTimeout(id);
    if (upstream) upstream.removeEventListener('abort', onAbort);
  };

  return { signal: ctrl.signal, cleanup };
}

/** Low-level JSON request helper. Throws ApiError on non-OK. */
export async function requestJSON<T = unknown>(
  path: string,
  init: RequestInit = {},
  { timeoutMs }: { timeoutMs?: number } = {}
): Promise<T> {
  const url = path.startsWith('http')
    ? path
    : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  // Coerce possible null to undefined to satisfy AbortSignal | undefined
  const parentSignal: AbortSignal | undefined = init?.signal ?? undefined;
  const { signal: timeoutSignal, cleanup: cleanupTimeout } = withTimeout(
    parentSignal,
    timeoutMs ?? 15_000
  );

  try {
    const res = await fetch(url, { ...init, signal: timeoutSignal });

    // Handle 204 / empty bodies safely
    const isNoContent =
      res.status === 204 || res.headers.get('content-length') === '0';

    let data: unknown = null;
    if (!isNoContent) {
      const ct = res.headers.get('content-type') ?? '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }
    }

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, {
        status: res.status,
        statusText: res.statusText,
        data,
      });
    }

    return data as T;
  } finally {
    cleanupTimeout();
  }
}

export function getJSON<T = unknown>(path: string, init: RequestInit = {}) {
  return requestJSON<T>(path, { ...init, method: 'GET' });
}

export function postJSON<T = unknown>(path: string, body: unknown, init: RequestInit = {}) {
  return requestJSON<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });
}

/* ------------------------------------------------------------------ */
/* Compatibility helpers for older code that used ../utils/api        */
/* ------------------------------------------------------------------ */

/** Fetch OHLC data for a symbol+interval. Uses POST /chart for compatibility. */
export async function fetchOHLC(
  symbol: string,
  interval = '1d',
  signal?: AbortSignal
): Promise<ChartCandle[]> {
  return postJSON<ChartCandle[]>('/chart', { symbols: [symbol], interval }, { signal });
}

/** Fetch a technical indicator series for a symbol. */
export async function fetchIndicator(
  symbol: string,
  indicator: string,
  interval = '1d',
  signal?: AbortSignal
): Promise<unknown> {
  return getJSON(
    `/indicator?symbol=${encodeURIComponent(symbol)}&indicator=${encodeURIComponent(
      indicator
    )}&interval=${encodeURIComponent(interval)}`,
    { signal }
  );
}
