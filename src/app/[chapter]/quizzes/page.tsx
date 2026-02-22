"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";
import { Chapter, Committee, chapterCommittees } from "@/types/quiz";
import { chaptersData } from "@/data/chaptersData";
import Link from "next/link";
import { getChapterMainColor } from "@/lib/utils";
interface QuizzesPageProps {
  params: Promise<{ chapter: string }>;
}

export default function QuizzesPage({ params }: QuizzesPageProps) {
  const resolvedParams = use(params);
  const chapter = resolvedParams.chapter;
  const mainColor = getChapterMainColor(chapter, chaptersData)
  const { isDark } = useThemeContext();
  const chapterKey = chapter.toUpperCase() as Chapter; 
  const committeesForChapter: Committee[] = chapterCommittees[chapterKey] || [];

  return (
    <div className="min-h-screen relative">
      {!isDark && (
        <div
          className="absolute -z-10 inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
              linear-gradient(to bottom, var(--${mainColor}-20) 1px, transparent 1px)
            `,
          }}
        />
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1
              className="text-3xl md:text-4xl lg:text-6xl font-bold my-4"
              style={{ color: `var(--${mainColor}-100)` }}
            >
              Ready To Take The Next Step?
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: `var(--${mainColor}-80)` }}
            >
              Explore the committees available in the {chapterKey} chapter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Committees List */}
      <section className="container mx-auto px-4">
        {committeesForChapter.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-700 text-lg py-20"
          >
            No committees available for {chapterKey}.
          </motion.p>
        ) : (
          <motion.ul
            layout
            className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
          >
            {committeesForChapter.map((committee, index) => (
              <motion.li
                key={committee}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + 0.2 * index }}
              >
                <Link
                  href={`/${chapter}/quizzes/${committee.replace(/\s+/g, "-").toLowerCase()}`}
                  className="block p-3 rounded-xl shadow-lg font-bold text-center text-lg md:text-xl hover:shadow-2xl hover:scale-[1.02] transition-colors duration-500  "
                  style={{
                    backgroundColor: `var(--${mainColor}-20)`,
                    border: `2px solid var(--${mainColor}-100)`,
                    color: `var(--${mainColor}-100)`,
                  }}
                >
                  {committee} 
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>
    </div>
  );
}
