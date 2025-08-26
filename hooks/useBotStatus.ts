import { useState, useEffect } from 'react';
import { getBotStatus } from '@/services/botService';

export function useBotStatus(botName: string) {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Reset stale state when botName changes
    setError(null);
    setStatus(null);
    setLoading(true);

    getBotStatus(botName)
      .then((res) => {
        if (mounted) setStatus(res);
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
  }, [botName]);

  return { status, loading, error };
}
