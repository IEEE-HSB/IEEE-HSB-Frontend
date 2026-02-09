'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import RoadmapCard from '@/components/knowledge-hub/RoadmapCard';
import SearchInput from '@/components/knowledge-hub/SearchInput';
import CategoryFilter from '@/components/knowledge-hub/CategoryFilter';
import SortDropdown from '@/components/knowledge-hub/SortDropdown';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useRoadmaps } from '@/hooks/useRoadmaps';
import { RoadmapFilter, SortOption } from '@/types/knowledge-hub';

export default function RoadmapsPage() {
  const { data: roadmaps, isLoading, isError } = useRoadmaps();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RoadmapFilter>('All');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const filteredAndSortedRoadmaps = useMemo(() => {
    if (!roadmaps) return [];

    let filtered = roadmaps;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((roadmap) => roadmap.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((roadmap) => 
        roadmap.title.toLowerCase().includes(lowerSearch) ||
        roadmap.description.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [roadmaps, selectedCategory, searchTerm, sortOption]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search roadmaps by title or description..."
        />
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <CategoryFilter 
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            type="roadmap"
          />
          
          <SortDropdown 
            value={sortOption}
            onChange={setSortOption}
          />
        </div>
      </div>

      {/* Results Count */}
      {!isLoading && !isError && (
        <p className="text-sm text-muted-foreground mb-6">
          {filteredAndSortedRoadmaps.length} roadmap{filteredAndSortedRoadmaps.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-20">
          <p className="text-destructive mb-4">Failed to load roadmaps</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-ieee-blue-100 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredAndSortedRoadmaps.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-2">No roadmaps found</p>
          <p className="text-muted-foreground">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your filters' 
              : 'No roadmaps available yet'}
          </p>
        </div>
      )}

      {/* Roadmaps Grid */}
      {!isLoading && !isError && filteredAndSortedRoadmaps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedRoadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <RoadmapCard roadmap={roadmap} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
