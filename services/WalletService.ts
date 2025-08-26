// services/walletService.ts

import { logError } from '@/logs/logger';

export interface WalletBalance {
  SOL: number;
  ETH: number;
  BTC: number;
  [token: string]: number;  // allow additional assets
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Retrieves the user's wallet balance for paper trading or real accounts.
 * - Accepts an optional AbortSignal to cancel the request.
 * - Logs errors to the central logging service.
 * - Caches the result in sessionStorage for the session.
 */
export async function getWalletBalance(
  signal?: AbortSignal
): Promise<WalletBalance> {
  const cacheKey = 'walletBalance';
  // Return cached value if present
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as WalletBalance;
  }

  try {
    const response = await fetch(`${BASE_URL}/wallet/balance`, { signal });
    if (!response.ok) {
      throw new Error(`Error fetching wallet balance: ${response.statusText}`);
    }
    const data = (await response.json()) as WalletBalance;
    // Cache for the session
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('getWalletBalance failed', { err });
    throw err;
  }
}
