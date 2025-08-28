import { useState, useEffect } from 'react';
import { getWalletBalance } from '@/services/walletService';

export function useWalletBalance() {
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getWalletBalance()
      .then((res) => {
        if (mounted) setBalance(res);
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

  return { balance, loading, error };
}
