'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Roadmap } from '@/types/knowledge-hub';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';

interface RoadmapCardProps {
  roadmap: Roadmap;
}

const categoryColors: Record<string, string> = {
  'Software Engineering': 'bg-ieee-blue-100',
  'Power Systems': 'bg-ieee-yellow-100 text-ieee-blue-100',
  'Robotics': 'bg-ieee-red-100',
  'Communications': 'bg-ieee-aqua-100',
  'AI & ML': 'bg-ieee-purple-100',
  'Embedded Systems': 'bg-ieee-green-100',
};

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const categoryColor = categoryColors[roadmap.category] || 'bg-ieee-blue-100';

  return (
    <Link href={`/knowledge-hub/roadmaps/${roadmap._id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="h-full bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {roadmap.coverImage ? (
            <ImageWithFallback
              src={roadmap.coverImage}
              alt={roadmap.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ieee-blue-100 to-ieee-aqua-100">
              <span className="text-white text-5xl font-bold">
                {roadmap.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 text-xs font-semibold text-white ${categoryColor} rounded-full shadow-lg`}>
              {roadmap.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-ieee-blue-100 transition-colors">
            {roadmap.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">
            {roadmap.description}
          </p>

          {/* Level Indicators */}
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 text-xs bg-ieee-green-100/20 text-ieee-green-100 rounded font-medium">
              Beginner
            </span>
            <span className="px-2 py-1 text-xs bg-ieee-yellow-100/20 text-ieee-yellow-100 rounded font-medium">
              Intermediate
            </span>
            <span className="px-2 py-1 text-xs bg-ieee-red-100/20 text-ieee-red-100 rounded font-medium">
              Advanced
            </span>
          </div>

          {/* Open Button */}
          <Button variant="outline" size="sm" className="w-full group-hover:bg-ieee-blue-100 group-hover:text-white group-hover:border-ieee-blue-100 transition-colors">
            Open Roadmap
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
