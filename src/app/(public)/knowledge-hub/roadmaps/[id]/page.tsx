'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRoadmapById } from '@/hooks/useRoadmapById';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import RoadmapLevel from '@/components/knowledge-hub/RoadmapLevel';

export default function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: roadmap, isLoading, isError } = useRoadmapById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !roadmap) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Roadmap Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The roadmap you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push('/knowledge-hub/roadmaps')}>
          Back to Roadmaps
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/knowledge-hub/roadmaps')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmaps
        </Button>
      </div>

      {/* Roadmap Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-ieee-blue-100 text-white rounded-full mb-4">
          {roadmap.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          {roadmap.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          {roadmap.description}
        </p>

        {/* CTA Button */}
        <Button size="lg" className="bg-ieee-blue-100 hover:bg-ieee-blue-80 text-white">
          Start Learning
        </Button>
      </motion.div>

      {/* Cover Image */}
      {roadmap.coverImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-4 mb-12"
        >
          <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg">
            <ImageWithFallback
              src={roadmap.coverImage}
              alt={roadmap.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Roadmap Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Learning Path
          </h2>

          {/* Render all levels */}
          {roadmap.levels.map((level, index) => {
            const colors: Array<'green' | 'yellow' | 'red'> = ['green', 'yellow', 'red'];
            const levelNames = ['Beginner', 'Intermediate', 'Advanced'];
            
            return (
              <RoadmapLevel
                key={level.levelNumber}
                level={level.title}
                color={colors[index % 3]}
                data={level}
                defaultOpen={index === 0}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
