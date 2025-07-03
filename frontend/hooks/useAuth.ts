import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useState } from 'react';

interface UserProfile {
  id: number;
  clerk_user_id: string;
  education_level: string;
  age: number;
  subjects: string[];
  created_at: string;
}

interface OnboardingData {
  education_level: string;
  age: number;
  subjects: string[];
}

export const useAuth = () => {
  const { isSignedIn, getToken } = useClerkAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get authenticated token for API requests
  const getAuthToken = async (): Promise<string | null> => {
    console.log('getAuthToken called');
    try {
      const token = await getToken({ template: 'Minerva' });
      console.log('Clerk JWT token:', token);
      return token;
    } catch (err) {
      console.error('Error getting auth token:', err);
      return null;
    }
  };
  // Make authenticated API request
  const makeAuthenticatedRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`http://localhost:8000${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response;
  };

  // Create user profile (onboarding)
  const createUserProfile = async (data: OnboardingData): Promise<UserProfile> => {
    console.log('createUserProfile called', data);
    setLoading(true);
    setError(null);
    try {
      console.log('entered create profile')
      const response = await makeAuthenticatedRequest('/api/v1/onboarding', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get current user info from backend
  const getCurrentUserInfo = async () => {
    try {
      //changed api from /me to /profile and the user_info should be based on if the user is in the table, not just clerk
      const response = await makeAuthenticatedRequest('/api/v1/user/profile');
      return await response.json();
    } catch (err) {
      console.error('Error getting user info:', err);
      return null;
    }
  };

  // Verify token validity
  const verifyToken = async () => {
    try {
      const response = await makeAuthenticatedRequest('/api/v1/auth/verify');
      return await response.json();
    } catch (err) {
      console.error('Error verifying token:', err);
      return null;
    }
  };

  return {
    // Clerk state
    isSignedIn,
    user,
    
    // Loading and error states
    loading,
    error,
    
    // Authentication functions
    getAuthToken,
    makeAuthenticatedRequest,
    createUserProfile,
    getCurrentUserInfo,
    verifyToken,
  };
}; 