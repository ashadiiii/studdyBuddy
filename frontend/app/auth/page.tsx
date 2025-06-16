"use client"

import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation"
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { BookOpen, Sparkles, Target, TrendingUp } from "lucide-react";
import React from "react";
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingData = localStorage.getItem('userOnboardingData');
    if (!onboardingData) {
      // If signed in but no onboarding data, redirect to onboarding
      const timer = setTimeout(() => {
        router.push('/onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // If onboarding is complete, redirect to dashboard
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const clerkAppearance = {
    elements: {
      formButtonPrimary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0",
      card: "shadow-none bg-transparent border-0 p-0",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      socialButtonsBlockButton: "bg-slate-600/80 dark:bg-slate-700/80 border border-slate-500/50 dark:border-slate-600/50 hover:bg-slate-500/90 dark:hover:bg-slate-600/90 text-white transition-colors rounded-xl py-3 px-4 font-medium",
      socialButtonsBlockButtonText: "text-white font-medium",
      formFieldInput: "bg-slate-700/60 dark:bg-slate-800/60 border border-slate-600/50 dark:border-slate-700/50 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-700/80 dark:focus:bg-slate-800/80",
      formFieldLabel: "text-slate-200 dark:text-slate-300 font-medium",
      footerActionLink: "text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors",
      formFieldInputShowPasswordButton: "text-slate-400 hover:text-slate-200 dark:text-slate-500 dark:hover:text-slate-300",
      dividerLine: "bg-slate-600/50 dark:bg-slate-700/50",
      dividerText: "text-slate-400 dark:text-slate-500",
      formFieldErrorText: "text-red-400 dark:text-red-400",
      identityPreviewText: "text-slate-300 dark:text-slate-400",
      identityPreviewEditButton: "text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300",
      footer: "bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50 dark:border-slate-800/50 rounded-b-xl mt-6 -mx-6 -mb-6 px-6 py-4",
      footerActionText: "text-slate-400 dark:text-slate-500",
      footerPages: "bg-slate-800/90 dark:bg-slate-900/90",
      footerPagesLink: "text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300",
      otpCodeFieldInput: "bg-slate-700/60 dark:bg-slate-800/60 border border-slate-600/50 dark:border-slate-700/50 text-white",
      formResendCodeLink: "text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300",
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-blue-400/15 dark:from-purple-500/8 dark:to-blue-500/8 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-6xl flex items-center justify-center gap-12 relative z-10">
        {/* Left side - Hero content */}
        <div className="hidden lg:flex flex-col space-y-8 flex-1 max-w-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                <BookOpen className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Study Assistant
              </h1>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Transform your learning journey with AI-powered study tools, personalized insights, and smart scheduling.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-blue-200/50 dark:border-blue-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
                <Target className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Smart Goal Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Set and achieve your learning objectives</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-indigo-200/50 dark:border-indigo-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl shadow-md">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Progress Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track your learning progress in real-time</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-purple-200/50 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">AI-Powered Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized study recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                <BookOpen className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Study Assistant
              </h1>
            </div>
          </div>

          <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-700/60 dark:border-slate-800/60 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-400">
                {isSignUp ? "Start your learning journey today" : "Continue your learning journey"}
              </p>
            </div>

            <SignedOut>
              {isSignUp ? (
                <SignUp 
                  forceRedirectUrl="/onboarding"
                  appearance={clerkAppearance}
                />
              ) : (
                <SignIn 
                  forceRedirectUrl="/"
                  appearance={clerkAppearance}
                />
              )}
              
              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-slate-400">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="mt-4 text-blue-400 hover:text-blue-300 hover:bg-slate-800/60 font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-700"
                >
                  {isSignUp ? "Sign in instead" : "Create account"}
                </Button>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                    {localStorage.getItem('userOnboardingData') ? 'Welcome back!' : 'Account created successfully!'}
                  </h3>
                  <p className="text-slate-400">
                    {localStorage.getItem('userOnboardingData') 
                      ? 'Redirecting to your dashboard...' 
                      : 'Let\'s set up your profile...'}
                  </p>
                </div>
                <div className="animate-pulse">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
