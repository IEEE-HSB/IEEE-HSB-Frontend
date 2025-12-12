import { TopBar } from '@/components/dashboard/TopBar';
import React from 'react'

export default function DashboardLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (

        <div>
            <div className="">
                <TopBar />
            </div>

     
           
                {children}

         


        </div>
    )
}
