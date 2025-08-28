// services/tradeService.ts

import { logError } from '@/logs/logger';

export interface TradeRecord {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Retrieves the trade history for a given user.
 * - Accepts an optional AbortSignal to cancel the request.
 * - Logs any errors to the central logging service.
 * - Caches the result in sessionStorage for the session.
 */
export async function getUserTradeHistory(
  userId: string,
  signal?: AbortSignal
): Promise<TradeRecord[]> {
  const cacheKey = `tradeHistory:${userId}`;
  // Return cached data if available
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as TradeRecord[];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/trades/${userId}`,
      { signal }
    );
    if (!response.ok) {
      throw new Error(`Error fetching trade history: ${response.statusText}`);
    }
    const data = (await response.json()) as TradeRecord[];
    // Cache for the session
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('getUserTradeHistory failed', { userId, err });
    throw err;
  }
}
