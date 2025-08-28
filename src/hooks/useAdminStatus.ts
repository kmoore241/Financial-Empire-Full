/* src/hooks/useAdminStatus.ts */
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";

export type AdminStatus = {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
};

/**
 * Checks whether the current Firebase Auth user is an admin.
 * Looks up Firestore doc at: admins/{uid}
 * - If no user is signed in, returns { isAdmin:false, loading:false }.
 * - Adjust the collection/path or field shape as needed for your app.
 */
export function useAdminStatus(): AdminStatus {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run on the client; during SSR we'll just short-circuit.
    const uid =
      typeof window === "undefined" ? null : auth.currentUser?.uid ?? null;

    if (!uid) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const snap = await getDoc(doc(db, "admins", uid));
        // Expecting a doc that either exists (admin) or has { isAdmin: true }.
        const value =
          snap.exists() && (snap.data()?.isAdmin ?? true) ? true : false;
        if (!cancelled) setIsAdmin(value);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "Failed to check admin status");
          setIsAdmin(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { isAdmin, loading, error };
}
