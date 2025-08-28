import { LogEntry } from './types';
// If you have an auth service, import like this:
// import { getAuthToken } from '@/services/authService';

/**
 * Sends a log entry to a remote logging endpoint with timestamp, auth header, and retry logic.
 */
export async function sendLog(entry: LogEntry, retries = 3): Promise<void> {
  // Attach timestamp if not provided
  const payload: LogEntry = {
    ...entry,
    timestamp: entry.timestamp ?? new Date().toISOString(),
  };

  // Optionally get auth token for protected endpoints
  let authToken: string | null = null;
  // try {
  //   authToken = await getAuthToken();
  // } catch {
  //   // Ignore token fetch errors
  // }

  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Failed to send log to server', err);
    // Retry logic with exponential backoff
    if (retries > 0) {
      const delay = (4 - retries) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendLog(entry, retries - 1);
    }
  }
}
