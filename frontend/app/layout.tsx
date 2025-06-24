import * as React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "../components/ui/toaster"
import { Toaster as Sonner } from "../components/ui/sonner"
import { ThemeProvider } from "../components/ThemeProvider"
import './globals.css'
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study Assistant',
  description: 'AI-powered study management platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider defaultTheme="system" storageKey="study-assistant-theme">
            <div style={{ display: "flex" }}>
              <Sidebar />
              <main style={{ flex: 1 }}>{children}</main>
            </div>
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

