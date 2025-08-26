// services/userService.ts

import { logError } from '@/logs/logger';

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

/**
 * Retrieves the user's LMS progress, including completed lessons and quiz scores.
 * - Uses sessionStorage to cache responses per userId
 * - Accepts an optional AbortSignal to cancel the request
 * - Logs any errors to the central logging service
 */
export async function getUserProgress(
  userId: string,
  signal?: AbortSignal
): Promise<UserProgress> {
  // Check cache first
  const cacheKey = `userProgress:${userId}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached) as UserProgress;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/user-progress/${userId}`,
      { signal }
    );
    if (!response.ok) {
      throw new Error(`Error fetching user progress: ${response.statusText}`);
    }
    const data = (await response.json()) as UserProgress;
    // Cache for future calls
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err: any) {
    logError('getUserProgress failed', { userId, err });
    throw err;
  }
}
