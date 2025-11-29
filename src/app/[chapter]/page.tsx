'use client';

import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/context/ThemeContext';
import { chaptersData } from '@/data/chaptersData';
import { notFound, useRouter } from 'next/navigation';
import React, { use } from 'react';

export default function Home({ params }: { params: Promise<{ chapter: string }> }) {
  const resolvedParams = use(params);
  const chapterData = chaptersData.find(ch => ch.chapterId === resolvedParams.chapter);
  const { isDark } = useThemeContext();
  const router = useRouter();

  if (!chapterData)
    notFound();


  const mainColor = chapterData.color.split('-').slice(0, 2).join('-'); // ieee-blue-100 -> ieee-blue

  const navigateToContactUsPage = () => {
    router.push(`/contact`);
    router.push(`/contact`);
  }
  const navigateToAboutPage = () => {
    router.push(`/${chapterData.chapterId}/about`);
  }

  return (
    <div className=''>
      <section className=' min-h-screen relative sm:-top-20 flex items-center justify-center overflow-hidden'>
        {!isDark && <div className="absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"
          style={{
            backgroundImage: `
      linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
      linear-gradient(to bottom, var(--${mainColor}-20), 1px, transparent 1px)
    `,
          }}
        ></div>}

        <div className="relative z-10 text-center px-4 mx-auto flex flex-col items-center gap-5">
          <p className=' text-shadow-2xs mt-5 text-center uppercase font-black text-[20px] md:text-[40px]'>
            <span style={{ color: `var(--${mainColor}-100)` }}>{chapterData.title}</span>
          </p>
          <p className="mb-6 text-[#717171] font-bold md:text-[20px] leading-[150%] tracking-[-0.011em] text-center align-middle"
            style={{ color: `var(--${mainColor}-100)` }}
          >
            {chapterData.brief}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br rounded-2xl p-4 md:p-12"
              style={{
                backgroundImage: `linear-gradient(
                                  to bottom right,
                                  var(--${mainColor}-60),
                                  var(--${mainColor}-20),
                                  var(--${mainColor}-60)
                                  )`,
              }}>
              <p className="text-gray-700 md:text-xl leading-relaxed whitespace-pre-line"
                style={{ color: `var(--${mainColor}-100)` }}
              >{chapterData.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={navigateToContactUsPage}
              size="lg"
              className=" text-white md:text-lg md:px-8 md:py-6 cursor-pointer"
              style={{ backgroundColor: `var(--${mainColor}-80)` }}>
              Contact Us
            </Button>
            <Button
              onClick={navigateToAboutPage}
              size="lg"
              className=" text-white md:text-lg md:px-8 md:py-6 cursor-pointer"
              style={{ backgroundColor: `var(--${mainColor}-80)` }}>
              Explore more
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
