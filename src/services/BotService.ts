// services/botService.ts

import { logError } from '@/logs/logger';

export interface BotStatus {
  botName: string;
  running: boolean;
  lastDecision: string;
  lastPrice: number;
  // add other fields as needed
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Retrieves the status of a given trading bot.
 * - Accepts an optional AbortSignal to cancel the request.
 * - Logs any errors to the central logging service.
 * - Caches the result in sessionStorage for the session.
 */
export async function getBotStatus(
  botName: string,
  signal?: AbortSignal
): Promise<BotStatus> {
  const cacheKey = `botStatus:${botName}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as BotStatus;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/bot-status/${botName}`,
      { signal }
    );
    if (!response.ok) {
      throw new Error(`Error fetching bot status: ${response.statusText}`);
    }
    const data = (await response.json()) as BotStatus;
    // Cache for the session
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('getBotStatus failed', { botName, err });
    throw err;
  }
}
