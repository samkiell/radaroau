"use client";

import Sidebar from '@/components/studentDashboardComponents/Sidebar'
import { useRoleAuth } from '@/hooks/useRoleAuth'
import React from 'react'
import Logo from '@/components/Logo'
import { DashboardHeaderSkeleton, SidebarSkeleton, AnalyticsSkeleton } from "@/components/skeletons";

const StudentDashboardLayout = ({children}) => {
  const { loading, authorized } = useRoleAuth('student');

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardHeaderSkeleton />
        <div className="flex">
          <div className="hidden md:block w-64">
            <SidebarSkeleton />
          </div>
          <main className="flex-1 p-4 md:p-8">
            <div className="container mx-auto max-w-7xl">
              <AnalyticsSkeleton />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
   <>
    <section className='flex flex-col md:flex-row min-h-screen'>
      {/* sidebar content - Hidden on mobile, shown on desktop */}
      <nav className='hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-gray-800 bg-black z-40 overflow-y-auto py-6'>
        <Sidebar />
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
         <Sidebar mobile />
      </div>
      {/* main content */}
      <main className='w-full md:ml-64 p-4 md:p-8 pt-20 pb-20 md:pt-8 md:pb-8'>
        {children}
      </main>
    </section>
   </>
  )
}

export default StudentDashboardLayout