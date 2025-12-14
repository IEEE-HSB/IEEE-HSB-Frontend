import Navbar from '@/components/dashboard/Navbar';
import React from 'react'

export default function DashboardLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (



        <div className=''>
          <Navbar/>

            <div className="p-4 sm:ml-64 mt-14 relative top-20">
                {children}
            </div>
        </div>



    )
}
