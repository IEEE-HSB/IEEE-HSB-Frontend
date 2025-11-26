'use client'
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
export default function ChapterCard(props: {chapterId: string, title: string; imageUrl: string, chapterName: string, color: string; brief: string }) {
    const { title, chapterName, imageUrl, color, brief, chapterId } = props
    const router = useRouter();

    function goToChapter() {
        router.push(`/${chapterId}`);
    }
    return (<>

        <div className="relative bg-transparent w-full h-full p-6 border border-ieee-blue-100 rounded-2xl shadow-xs">
            <div className="flex flex-col items-center">
                <img className={`w-24 h-24 mb-6 rounded-full p-1`}
                    style={{ backgroundColor: `var(--${color})` }}
                    src={imageUrl} alt={title} />
                <h5 className="mb-0.5 text-3xl text-ieee-blue-80 font-semibold tracking-tight text-heading ">{chapterName}</h5>
                <p className="desc text-xl text-gray-600 dark:text-gray-400">
                    {brief}
                </p>
                <div className="mt-4 md:mt-6">
                    < Button
                     onClick={goToChapter}
                     className="inline-flex items-center text-white text-lg bg-ieee-blue-100 hover:bg-ieee-cyan-100 cursor-pointer py-6">
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
                        </svg>
                        Discover more
                    </Button>
                </div>


            </div>

        </div>


    </>
    )
}
