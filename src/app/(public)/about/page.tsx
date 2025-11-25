"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import IeeeLogo from "@/assets/logos/ieeeLogo";

export default function About() {
  const chapters = [
    {
      name: "RAS",
      desc: "Robotics & Automation Society",
      src: "/assets/logos/rasLogo.png",
      color: "#BA0C2F",
    },
    {
      name: "PES",
      desc: "Power & Energy Society",
      src: "/assets/logos/pesLogo.png",
      color: "#64A70B",
    },
    {
      name: "ComSoc",
      desc: "Communications Society",
      src: "/assets/logos/comsocLogo.png",
      color: "#FFD100",
    },
    {
      name: "CS",
      desc: "Computer Society",
      src: "/assets/logos/csLogo.png",
      color: "#F2A900",
    },
    {
      name: "WIE",
      desc: "Women in Engineering",
      src: "/assets/logos/wieLogo.png",
      color: "#981D97",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-[#101114] transition-colors duration-500">
      <div className="px-6 md:px-20 lg:px-40 py-25">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-[#00629B] dark:text-[#58A6FF]"
        >
          About IEEE Helwan SB
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-center text-gray-700 dark:text-gray-300 text-md max-w-5xl mx-auto"
        >
          Fostering engineers and innovators at Helwan University through
          creativity, learning, and technology.
        </motion.p>
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 bg-white/70 dark:bg-[#2082B0]/20 backdrop-blur-sm shadow-lg rounded-2xl border-l-4 border-[#00629B] dark:border-[#58A6FF]"
          >
            <h2 className="text-2xl font-bold text-[#00629B] dark:text-[#58A6FF] mb-4">
              VISION
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              IEEE’s core purpose is to foster technological innovation and
              excellence for the benefit of humanity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 bg-white/70 dark:bg-[#FFDA89]/20 backdrop-blur-sm shadow-lg rounded-2xl border-l-4 border-[#F5B800] dark:border-[#FFC72C]"
          >
            <h2 className="text-2xl font-bold text-[#F5B800] dark:text-[#FFC72C] mb-4">
              MISSION
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Empower undergraduates’ technological knowledge and mindset
              through innovative learning experiences and projects across our
              specialized societies — Robotics, Power, Software, and more.
            </p>
          </motion.div>
        </div>
        {/* About IEEE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8    transition-colors duration-500"
        >
          <h2 className="text-2xl font-bold text-[#00629B] dark:text-[#58A6FF] mb-4">
            About IEEE
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            IEEE stands for “Institute of Electrical and Electronics Engineers”,
            the world&apos;s largest professional association for advancing
            technology. IEEE Helwan SB is the 3rd created branch in Egypt and
            the first student organization at Helwan University. It proudly
            includes four chapters (RAS, PES, ComSoc, CS) and one affinity group
            (WIE).
          </p>
        </motion.div>
        {/*About IEEE Helwan SB*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className=" p-8 rounded-2xl "
        >
          <h2 className="text-2xl font-bold text-[#00629B] dark:text-[#58A6FF] mb-4">
            About IEEE Helwan SB
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex flex-row gap-4 items-center mb-3">
            <IeeeLogo size={20} fillColor="#00629B" /> IEEE Helwan SB is the 3rd
            created branch in Egypt and was the very first student organization
            founded at Helwan University.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex flex-row gap-4 items-center mb-3">
            <IeeeLogo size={20} fillColor="#00629B" /> IEEE Helwan SB was
            awarded in many worldwide competitions; it has four chapters called
            RAS, PES, ComSoc, CS, and one affinity group known as WIE.
          </p>
        </motion.div>
        {/* Chapters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-center text-3xl font-extrabold text-[#00629B] dark:text-[#58A6FF] mb-10">
            Our Chapters
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
              <motion.div
                key={ch.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ borderColor: ch.color }}
                className="p-6 bg-white dark:bg-[#202125] shadow-md rounded-2xl flex items-center gap-4 hover:shadow-lg border-2 transition-colors duration-500"
              >
                <div
                  className="flex justify-center items-center rounded-full p-3"
                  style={{
                    backgroundColor: ch.color,
                    border: `2px solid ${ch.color}`,
                  }}
                >
                  <Image
                    src={ch.src}
                    alt={ch.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-12 h-auto object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold" style={{ color: ch.color }}>
                    {ch.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {ch.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
