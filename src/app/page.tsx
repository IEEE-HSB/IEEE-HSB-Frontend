'use client';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from '@/components/ui/button';
import Chapters from '@/components/sections/Chapters';
import ChairPersons from '@/components/sections/Chairpersons';
import SponsorsMarquee from '@/components/sections/Sponsors';
import Link from 'next/link';
import Popout from '@/components/Popout';
import Image from 'next/image';


export default function Home() {

  function scrollToChapters() {
    const chaptersSection = document.getElementById('chapters-section');
    if (chaptersSection) {
      chaptersSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
    
  const [show, setShow] = useState(true);
  useEffect(()=>{
    const timer =setTimeout(()=>{setShow(false)},3000)
    return()=>clearTimeout(timer)
  },[])

  return (
    <div>
      <div className="min-h-screen relative">
        {/* Hero Section */}
        {/* <Decor /> */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjA4NTAzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Technology Network Background"
              className="w-full h-full object-cover opacity-30 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-linear-to-b from-ieee-blue-100/20 to-background"></div>
          </div>
          <div className="flex fixed top-20 left-0 w-full pointer-events-none z-999">
            <Image className='z-999  top-0' alt='' src='/assets/ramadan.png' width={1000} height={300} />
            <Image className='z-999  top-0' alt='' src='/assets/ramadan.png' width={1000} height={200} />

          </div>
          <Popout/>
          {/* Content */}
          <div className="relative z-10 text-center px-4 mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-[#717171] font-bold text-[20px] leading-[150%] tracking-[-0.011em] text-center align-middle"
            >
              IEEE Helwan Student Branch
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=' text-shadow-2xs text-white font-bold text-2xl text-center uppercase md:font-black md:text-[40px]'
            >
              Empowering Innovation, Inspiring Growth <span className='text-[#00629B]'>-IEEE Helwan</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[16px] mb-8 text-[#706d6d] tracking-[-0.011em] font-medium lg:px-32 px-5 mt-7"
            >
              IEEE, Institute of Electrical and Electronics Engineers, is the biggest professional association that is dedicated to advancing technological innovation and excellence. It was formed in 1963 with roots that go back to 1884.
              IEEE Helwan Student Branch, is the 3rd student Branch in Egypt Section. Known for its annual Academic Program.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                onClick={scrollToChapters}
                size="lg"
                className="bg-ieee-yellow-100 text-ieee-blue-100 hover:bg-ieee-yellow-100/90 text-lg px-8 py-6 cursor-pointer"
              >
                Explore More
              </Button>
            </motion.div>
            {/* <Link href="/cs">
              <button>Go to CS Chapter</button>
            </Link> */}


          </div>
        </section>
        {/*Chapters Section */}
        <section id="chapters-section" className="pb-10 bg-linear-to-b from-background to-ieee-blue-100/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ieee-blue-100 dark:text-white mb-4 uppercase">Our Chapters</h2>
            <p className="text-lg text-[#706d6d]  mx-auto max-w-2xl pb-5 pt-2">
              Explore the diverse chapters of IEEE Helwan Student Branch, each dedicated to advancing knowledge and innovation in their respective fields.
            </p>
            <Chapters />
          </div>
        </section>


        {/* <section className='py-10'>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-ieee-blue-100 dark:text-white mb-4">
              MEET OUR CHAIRPERSONS
            </p>
          </div>
          <ChairPersons />

        </section> */}

        {/*Sponsors Section */}
        <section className="py-10 bg-eee-blue-100/10 relative text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ieee-blue-100 dark:text-white mb-4 uppercase">Our Sponsors</h2>
            <p className="text-lg text-[#706d6d]  mx-auto max-w-2xl pb-5 pt-2">
            </p>
            <SponsorsMarquee />
          </div>
          <Link href="/sponsors" className="bg-ieee-blue-100  p-3 my-5 mx-auto rounded text-white">View All Sponsors</Link>

        </section>

      </div>


    </div>
  )
}
