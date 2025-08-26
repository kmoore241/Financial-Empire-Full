import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Hook to track Firebase authentication status.
 * Returns { user, loading, error }.
 */
export function useAuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state on mount
    setUser(null);
    setLoading(true);
    setError(null);

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
