import Sidebar from '@/components/studentDashboardComponents/Sidebar'
import React from 'react'

const StudentDashboardLayout = ({children}) => {
  return (
   <>
    <section className='flex flex-col md:flex-row gap-2'>
      {/* sidebar content */}
      <nav className='fixed bottom-0 w-full mt-20 p-2 rounded-xl md:mt-0 md:left-0 md:pt-10 md:w-66 lg:w-65 border border-gray-800 md:min-h-screen order-1 bg-[#0A0A14] z-50'>
        <Sidebar />
      </nav>
      {/* main content */}
      <main className='md:ml-70 w-full p-4 md:p-8 mb-20 md:mb-0'>
        {children}
      </main>
    </section>
   </>
  )
}

export default StudentDashboardLayout