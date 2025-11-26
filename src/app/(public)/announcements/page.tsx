"use client";

import { useAnnouncements } from "@/hooks/useFetch";
import type { Announcement } from "@/types/announcement";
import AnnouncementsCard from "@/components/AnnouncementsCard";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AnnouncementPage() {
  const { data: announcements, isLoading, isError } = useAnnouncements();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <p className="p-4 text-center text-red-600">
        Failed to load announcements. Please try again later.
      </p>
    );

  if (!announcements || announcements.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-gray-600">
          No announcements available at the moment.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0d0f] transition-colors duration-300">
    
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full  py-12 px-6 md:px-20 rounded-b-3xl  mt-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 ">
       
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: -6, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-48 h-48  hidden md:block"
          >
            <Image
              src="/assets/images/8905508.png"
              alt="Hero"
              fill
              className="object-contain rounded-lg drop-shadow-2xl"
            />
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <h1 className="text-4xl text-[var(--ieee-blue-100)] dark:text-[var(--ieee-blue-20)] md:text-5xl font-extrabold">
              Announcements
            </h1>

            <p className="mt-2 text-[var(--ieee-blue-100)] dark:text-[var(--ieee-blue-20)] text-lg opacity-95">
              Stay updated with the latest news, events and important updates
              from IEEE Helwan.
            </p>
          </motion.div>
        </div>
      </motion.header>

      <main className=" mx-auto px-6 md:px-30 py-12">
      
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {announcements.map((a: Announcement) => (
            <motion.div
              key={a.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <AnnouncementsCard a={a} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
