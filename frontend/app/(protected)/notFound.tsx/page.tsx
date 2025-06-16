"use client"; // <-- Add this line

import { useEffect } from "react";
import { ThemeToggle } from "../../../components/ThemeToggle";
import React from "react";
import { usePathname } from "next/navigation"; // <-- Import usePathname
import Link from "next/link"; // <-- Import Link

const NotFound = () => {
  const pathname = usePathname(); // <-- Use usePathname

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname // <-- Use pathname here
    );
  }, [pathname]); // <-- Update dependency array

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
        {/* Use Link component for navigation */}
        <Link href="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;