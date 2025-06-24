
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center mb-10 md:mb-14 gap-5 md:gap-8">
      <div className="flex-1 text-center md:text-left md:pr-8">
        <h1 className="text-4xl sm:text-5xl font-[900] flex items-center gap-3 animate-fade-in">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Deneths's Learning Hub
          </span>
          <span className="text-3xl animate-bounce">🚀</span>
        </h1>
        <div className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-3 font-medium">
          Transform your learning journey with AI-powered insights!
        </div>
        <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 dark:text-green-300 text-sm font-medium">12-day streak</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">Level 7 Scholar</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
