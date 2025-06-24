"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm from '../../components/OnboardingForm';

export default function OnboardingPage() {
  const router = useRouter();

  // Handler to redirect after successful onboarding
  const handleSuccess = () => {
    router.replace('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-4">
      <OnboardingForm onSuccess={handleSuccess} />
    </div>
  );
}