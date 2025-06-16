import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import React from 'react'
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } =await auth()
  
  if (!userId) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[220px]">
        {children}
      </div>
    </div>
  )
}
