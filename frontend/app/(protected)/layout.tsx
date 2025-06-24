"use client"

import ProtectedRoute from '../../components/ProtectedRoute'
import Sidebar from '../../components/Sidebar'
import React from 'react'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-[220px]">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
}
