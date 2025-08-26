import { useState, useEffect } from 'react';
import { fetchMarketSentiment } from '@/services/sentimentService';

export function useMarketSentiment() {
  const [sentiment, setSentiment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    // Reset stale state before fetching
    setError(null);
    setSentiment(null);
    setLoading(true);

    fetchMarketSentiment()
      .then((res) => {
        if (mounted) setSentiment(res);
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
  }, []);

  return { sentiment, loading, error };
}
