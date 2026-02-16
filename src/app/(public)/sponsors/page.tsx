'use client'
import React from 'react'
import cards from "@/data/SponsorsData";
import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

const Sponsors = () => {
  const {isDark} = useTheme()
  return (
    <div>

<section className="relative  bg-linear-to-br from-ieee-aqua-100 to-ieee-cyan-100 text-white pt-20 pb-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our sponsors
            </h1>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            stroke='none'
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              className="fill-background"
              stroke={isDark ? '#020618' : '#ffffff'}

            />
          </svg>
        </div>
      </section>
         <div className="p-3">
             <div className="flex flex-wrap gap-5 max-w-fit justify-center">
                {[...cards, ...cards].map((card, index) => (
                    <div
                        key={index}
                        className="w-50 h-50 rounded-2xl flex items-center justify-center bg-white dark:bg-[#0F172B] shadow-lg border-t-2 border-b-2 border-ieee-blue-100 p-4 "
                    >
                        <Image width={500} height={500} src={card.src} className="w-full p-3" alt={card.title} />
                    </div>
                ))}
            </div>
         </div>
        </div>
  )
}

export default Sponsors