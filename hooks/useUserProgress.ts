import { useState, useEffect } from 'react';
import { getUserProgress } from '@/services/userService';

export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!userId) return;
    setLoading(true);
    getUserProgress(userId)
      .then((res) => {
        if (mounted) setProgress(res);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [userId]);

  return { progress, loading, error };
}
