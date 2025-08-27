import { useCallback, useEffect, useMemo, useState } from "react";

export type AuthUser = { id?: string; uid?: string; email?: string | null; role?: string } | null;

/**
 * Guest-first auth status.
 * - Never blocks SSR/build.
 * - If you later wire Firebase/AuthContext, replace internals but keep the shape.
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Optional flag to allow guests (default true if unset)
  const allowGuest = (process.env.NEXT_PUBLIC_ALLOW_GUEST ?? "true") === "true";

  // Continue as guest: mark a local flag and clear any user
  const continueAsGuest = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("fe_guest", "1");
      }
    } catch {}
    setUser(null);
  }, []);

  useEffect(() => {
    // Simulate a fast client-side auth check.
    // Replace with your real auth (e.g., Firebase onAuthStateChanged) later.
    if (typeof window === "undefined") return; // SSR: do nothing
    setLoading(true);
    try {
      const token = window.localStorage.getItem("auth_token");
      if (token) {
        setUser({ id: "1", email: "user@example.com", role: "user" }); // mock user
      } else {
        // guest by default
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const isGuest = useMemo(() => user == null, [user]);
  const isAuthenticated = !isGuest;

  return { user, loading, isGuest, isAuthenticated, allowGuest, continueAsGuest };
}

export default useAuth;
