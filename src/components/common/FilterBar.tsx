"use client";

import { ChapterFilter } from '@/types/gallery';
import { motion } from 'framer-motion';

interface FilterBarProps {
  activeFilter: ChapterFilter;
  onFilterChange: (filter: ChapterFilter) => void;
}

const chapters: ChapterFilter[] = ['All', 'WIE', 'CS', 'PES', 'RAS', 'COMSOC'];

const chapterNames: Record<ChapterFilter, string> = {
  All: 'All Events',
  WIE: 'Women In Engineering',
  CS: 'Computer Society',
  PES: 'Power & Energy',
  RAS: 'Robotics & Automation',
  COMSOC: 'Communications Society',
};

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Filter by Chapter</h2>
      
      {/* Desktop Filter - Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-ieee-aqua-100 scrollbar-track-muted">
        {chapters.map((chapter) => {
          const isActive = activeFilter === chapter;
          
          return (
            <motion.button
              key={chapter}
              onClick={() => onFilterChange(chapter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-2.5 rounded-full font-medium whitespace-nowrap
                transition-all duration-300 border-2
                ${
                  isActive
                    ? 'bg-ieee-aqua-100 text-white border-ieee-aqua-100 shadow-lg'
                    : 'bg-background text-foreground border-border hover:border-ieee-aqua-100 hover:text-ieee-aqua-100'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {chapter}
                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block w-2 h-2 bg-white rounded-full"
                  />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Filter Info */}
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-sm text-muted-foreground"
      >
        Showing: <span className="font-semibold text-ieee-aqua-100">{chapterNames[activeFilter]}</span>
      </motion.div>
    </div>
  );
}
