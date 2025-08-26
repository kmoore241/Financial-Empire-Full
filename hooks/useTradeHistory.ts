import { useState, useEffect } from 'react';
import { getUserTradeHistory } from '@/services/tradeService';

export function useTradeHistory(userId: string) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!userId) return;

    // Reset stale state when userId changes
    setError(null);
    setHistory([]);
    setLoading(true);

    getUserTradeHistory(userId)
      .then((data) => {
        if (mounted) setHistory(data);
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

  return { history, loading, error };
}
