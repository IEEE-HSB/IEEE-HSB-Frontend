'use client';

import { ReactNode, use } from 'react';
import Sidebar from '@/components/common/Sidebar';
import { chaptersData } from '@/data/chaptersData';

export default function ChapterLayout({ children, params }: { children: ReactNode; params: Promise<{ chapter: string }> }) {
  const resolvedParams = use(params); 
  const chapterData = chaptersData.find(ch => ch.chapterId === resolvedParams.chapter);

  if (!chapterData) return <div>Chapter not found</div>;

  const { color } = chapterData;

  return (
    <main className="flex mt-5">
      <Sidebar color={color} />
      <div className="ml-[70px] w-full mx-auto">
        {children}
      </div>
    </main>
  );
}
