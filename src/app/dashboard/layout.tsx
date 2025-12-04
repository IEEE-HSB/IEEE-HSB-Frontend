import { TopBar } from '@/components/dashboard/TopBar';
import React from 'react'

export default function DashboardLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
       
        <div>
            <div className="mb-20">
                <TopBar />
            </div>

            {children}
        </div>
    )
}
