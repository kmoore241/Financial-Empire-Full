// services/sentimentService.ts

import { logError } from '@/logs/logger';

export interface MarketSentiment {
  fearGreedIndex: number;
  timestamp: string;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Fetches the current market sentiment (fear/greed index and related data).
 * - Accepts an optional AbortSignal to cancel the request.
 * - Logs any errors to the central logging service.
 * - Caches the result in sessionStorage for the session.
 */
export async function fetchMarketSentiment(signal?: AbortSignal): Promise<MarketSentiment> {
  const cacheKey = 'marketSentiment';
  // Return cached value if present
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as MarketSentiment;
  }

  try {
    const response = await fetch(`${BASE_URL}/sentiment`, { signal });
    if (!response.ok) {
      throw new Error(`Error fetching market sentiment: ${response.statusText}`);
    }
    const data = (await response.json()) as MarketSentiment;
    // Cache for the session
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('fetchMarketSentiment failed', { err });
    throw err;
  }
}
