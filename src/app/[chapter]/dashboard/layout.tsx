import Navbar from '@/components/dashboard/Navbar';
import Script from 'next/script';
import React from 'react'

export default function DashboardLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (<>
 {/*  Google tag (gtag.js) */}
      <Script strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-HQYJ619QV9"></Script>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQYJ619QV9');
          `}
      </Script>


        <div className=''>
          <Navbar/>

            <div className="p-4 sm:ml-64 mt-14 relative top-20">
                {children}
            </div>
        </div>
</>


    )
}
