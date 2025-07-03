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
  const { getAuthToken, getCurrentUserInfo } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [userExists, setUserExists] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAccess() {
      // Step 1: Check if user is authenticated
      if (!isSignedIn) {
        router.push('/auth')
        return
      }

      // Step 2: Check if user exists in backend
      try {
        const response = await getCurrentUserInfo()
        if (response) {
          console.log('user exists')
          setUserExists(true)
        } else {
          setUserExists(false)
        }
      } catch (error) {
        setUserExists(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkAccess()
  }, [isSignedIn, getAuthToken, getCurrentUserInfo, router])

  // Wait for the async check to finish before making a decision
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

  if (!userExists) {
    console.log('checking user exists')

    router.push('/onboarding')
    return null
  }

  // User is authenticated and exists in backend, show the protected content
  return <>{children}</>
}