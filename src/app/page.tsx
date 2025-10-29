'use client'
import React from 'react'
import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from '@/components/ui/button';


export default function Home() {
  return (
    <div>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjA4NTAzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Technology Network Background"
              className="w-full h-full object-cover opacity-30 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ieee-blue-100/45 to-background"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-[#717171] font-bold text-[20px] leading-[150%] tracking-[-0.011em] text-center align-middle"
            >
              IEEE Student Community Helwan University
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
                //   onClick={scrollToChapters}
                size="lg"
                className="bg-ieee-yellow-100 text-ieee-blue-100 hover:bg-ieee-yellow-100/90 text-lg px-8 py-6"
              >
                Explore More
              </Button>
            </motion.div>
          </div>
        </section>
        
        </div>
       

    </div>
  )
}
