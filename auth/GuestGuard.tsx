import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuthStatus'

interface GuestGuardProps {
  children: ReactNode
  fallback?: ReactNode
  requireAuth?: boolean
}

export const GuestGuard = ({ 
  children, 
  fallback,
  requireAuth = false 
}: GuestGuardProps) => {
  const { user, loading, allowGuest } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // If auth is required and user is not authenticated
  if (requireAuth && !user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              You need to sign in to access this feature.
            </p>
            <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
            {allowGuest && (
              <p className="text-sm text-gray-500 mt-4">
                Or continue browsing as a guest
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}