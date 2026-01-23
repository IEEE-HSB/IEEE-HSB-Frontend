'use client';

import { ReactNode, use } from 'react';
import Sidebar from '@/components/common/Sidebar';
import { chaptersData } from '@/data/chaptersData';
import { notFound } from 'next/navigation';
import Script from 'next/script';
export default function ChapterLayout({ children, params }: { children: ReactNode; params: Promise<{ chapter: string }> }) {
  const resolvedParams = use(params);
  const chapterData = chaptersData.find(ch => ch.chapterId === resolvedParams.chapter);

  if (!chapterData)
    notFound();


  const { color } = chapterData;

  return (
    <>
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
      <main className="flex max-w-full overflow-x-hidden">
        <Sidebar color={color} />
        <div className="ml-[70px] w-full mx-auto">
          {children}
        </div>
      </main>
    </>

  );
}




