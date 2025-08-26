import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  role?: string
}

interface AuthStatus {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  allowGuest: boolean
}

export const useAuth = (): AuthStatus => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Check if guest mode is enabled
  const allowGuest = process.env.NEXT_PUBLIC_ALLOW_GUEST === 'true'

  useEffect(() => {
    // Simulate auth check - replace with actual auth logic
    const checkAuth = async () => {
      try {
        // Mock auth check - replace with real implementation
        const token = localStorage.getItem('auth_token')
        if (token) {
          // Mock user data - replace with API call
          setUser({
            id: '1',
            email: 'user@example.com',
            role: 'user'
          })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    allowGuest
  }
}