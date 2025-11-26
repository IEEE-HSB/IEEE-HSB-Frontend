"use client";

import Image from 'next/image';
import { GalleryItem } from '@/types/gallery';
import { motion } from 'framer-motion';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
}

const chapterColors: Record<string, { bg: string; text: string }> = {
  WIE: { bg: 'bg-ieee-purple-100', text: 'text-white' },
  CS: { bg: 'bg-ieee-blue-100', text: 'text-white' },
  PES: { bg: 'bg-ieee-green-100', text: 'text-white' },
  RAS: { bg: 'bg-ieee-red-100', text: 'text-white' },
  IAS: { bg: 'bg-ieee-teal-100', text: 'text-white' },
  EMBS: { bg: 'bg-ieee-aqua-100', text: 'text-white' },
  'MTT-S': { bg: 'bg-ieee-cyan-100', text: 'text-white' },
};

export default function GalleryCard({ item, index }: GalleryCardProps) {
  const colors = chapterColors[item.chapterId] || { bg: 'bg-ieee-blue-100', text: 'text-white' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        {/* Chapter Badge */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
        >
          {item.chapterId}
        </span>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-full bg-ieee-aqua-100 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
