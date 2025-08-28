import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuthStatus";

export type GuestGuardProps = {
  children: ReactNode;
  /** Optional UI to show when auth is required but user isn't signed in */
  fallback?: ReactNode;
  /** If true, block access unless signed in (unless guest is allowed). Defaults to false. */
  requireAuth?: boolean;
  /** Optional sign-in click handler (route to /login, open modal, etc.) */
  onSignInClick?: () => void;
};

/**
 * Guest-first guard:
 * - Renders a loading spinner while auth state resolves.
 * - If `requireAuth` and user is NOT signed in:
 *    - If `allowGuest` (from useAuthStatus) is true → still render children (guest access).
 *    - Otherwise → show `fallback` or a built-in "Sign In Required" panel.
 * - Exposes both default and named exports to satisfy any import style.
 *
 * Note: Set NEXT_PUBLIC_ALLOW_GUEST=true in Vercel envs to allow guest access.
 */
function GuestGuard({
  children,
  fallback,
  requireAuth = false,
  onSignInClick
}: GuestGuardProps) {
  const { user, loading, allowGuest } = useAuth();

  // 1) While checking auth (SSR-safe)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // 2) If page requires auth and user is not signed in
  //    - If guest is allowed, do NOT block: render children anyway.
  //    - If guest is NOT allowed, show fallback or the built-in panel.
  const mustBlock = requireAuth && !user && !allowGuest;

  if (mustBlock) {
    return (
      fallback ?? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">
                You need to sign in to access this feature.
              </p>
              <button
                onClick={onSignInClick}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )
    );
  }

  // 3) Default: render page content (guest or authenticated)
  return <>{children}</>;
}

export default GuestGuard;
export { GuestGuard };
