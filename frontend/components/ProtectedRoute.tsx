"use client"

import { useUser } from '@clerk/nextjs'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, user } = useUser()
  const { getAuthToken, makeAuthenticatedRequest } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [userExists, setUserExists] = useState(false)
  const router = useRouter()

  console.log('🔒 [ProtectedRoute] Auth state - isSignedIn:', isSignedIn, 'userId:', user?.id)

  useEffect(() => {
    async function checkAccess() {
      // Step 1: Check if user is authenticated
      if (!isSignedIn) {
        console.log('🔒 [ProtectedRoute] User not signed in, redirecting to auth')
        router.push('/auth')
        return
      }

      // Step 2: Check if user exists in backend
      console.log('🔍 [ProtectedRoute] Checking if user exists in backend...')
      
      try {
        const token = await getAuthToken()
        console.log('🔑 [ProtectedRoute] Got auth token:', token ? 'Token received' : 'No token')
        
        if (!token) {
          console.error('❌ [ProtectedRoute] No authentication token available')
          setUserExists(false)
          setIsChecking(false)
          return
        }

        const response = await makeAuthenticatedRequest('/api/v1/auth/me')
        
        if (response.ok) {
          const data = await response.json()
          console.log('📊 [ProtectedRoute] Backend response:', data)
          
          const exists = !!data && !!data.user
          console.log('🎯 [ProtectedRoute] User exists in backend:', exists)
          
          setUserExists(exists)
        } else {
          console.error('❌ [ProtectedRoute] Backend request failed:', response.status)
          setUserExists(false)
        }
      } catch (error) {
        console.error('💥 [ProtectedRoute] Error checking user existence:', error)
        setUserExists(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkAccess()
  }, [isSignedIn, user, getAuthToken, makeAuthenticatedRequest, router])

  // Show loading state
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to onboarding if user doesn't exist in backend
  if (!userExists) {
    console.log('🔄 [ProtectedRoute] User doesn\'t exist in backend, redirecting to onboarding...')
    router.push('/onboarding')
    return null
  }

  // User is authenticated and exists in backend, show the protected content
  console.log('✅ [ProtectedRoute] Access granted, showing protected content')
  return <>{children}</>
}
