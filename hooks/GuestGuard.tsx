import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuthStatus";

interface GuestGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function GuestGuard({ children, requireAuth = false }: GuestGuardProps) {
  const { user, loading, isGuest, continueAsGuest } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <div>Loading…</div>
      </div>
    );
  }

  if (requireAuth && isGuest && typeof window !== "undefined") {
    return (
      <div style={{ padding: 24 }}>
        <h3>Sign in required</h3>
        <button onClick={continueAsGuest} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }}>
          Continue as guest
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
