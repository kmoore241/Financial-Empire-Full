// services/chartService.ts

import { logError } from '@/logs/logger';

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Fetches chart data for given symbols.
 * - Accepts an optional AbortSignal to cancel the request.
 * - Logs any errors to the central logging service.
 * - Caches the result in sessionStorage for the session.
 */
export async function getChartData(
  symbols: string[],
  signal?: AbortSignal
): Promise<ChartData[]> {
  const cacheKey = `chartData:${symbols.join(',')}`;
  // Return cached value if present
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as ChartData[];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/chart`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols }),
        signal,
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching chart data: ${response.statusText}`);
    }
    const data = (await response.json()) as ChartData[];
    // Cache for the session
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('getChartData failed', { symbols, err });
    throw err;
  }
}
