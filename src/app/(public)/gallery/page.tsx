'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GalleryCard from '@/components/common/GalleryCard';
import FilterBar from '@/components/common/FilterBar';
import { ChapterFilter, GalleryType } from '@/types/gallery';
import { useThemeContext } from '@/context/ThemeContext';
import { useApiQuery } from '@/hooks/useFetch';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<ChapterFilter>('All');
  const { isDark } = useThemeContext();

  const { data: gallery, isLoading, isError, error } = useApiQuery<GalleryType[]>({
    queryKey: ["gallery"],
    url: "https://api.ieeehsb.com/api/gallary",
    method: "GET"
  });

  // Filter gallery items based on selected chapter
  const filteredGallery = useMemo(() => {
    if (!gallery) return [];
    return activeFilter === 'All'
      ? gallery
      : gallery.filter((item) => item.chapterId === activeFilter);
  }, [gallery, activeFilter]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading gallery: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-ieee-aqua-100 to-ieee-cyan-100 text-white pt-20 pb-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Explore memorable moments from IEEE Helwan Student Branch events across all chapters
            </p>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              className="fill-background"
              stroke={isDark ? '#020618' : '#ffffff'}
            />
          </svg>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Filter Bar */}
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredGallery.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Gallery Found
            </h3>
            <p className="text-muted-foreground">
              No Gallery available for the selected chapter. Try selecting a different filter.
            </p>
          </motion.div>
        )}

        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-muted-foreground"
        >
          <p>
            Showing <span className="font-semibold text-ieee-aqua-100">{filteredGallery.length}</span> of{' '}
            <span className="font-semibold text-ieee-aqua-100">{gallery?.length ?? 0}</span> items
          </p>
        </motion.div>
      </section>
    </div>
  );
}
