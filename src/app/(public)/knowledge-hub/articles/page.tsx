'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '@/components/knowledge-hub/ArticleCard';
import SearchInput from '@/components/knowledge-hub/SearchInput';
import CategoryFilter from '@/components/knowledge-hub/CategoryFilter';
import SortDropdown from '@/components/knowledge-hub/SortDropdown';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useArticles } from '@/hooks/useArticles';
import { KnowledgeFilter, SortOption } from '@/types/knowledge-hub';

export default function ArticlesPage() {
  const { data: articles, isLoading, isError } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeFilter>('All');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const filteredAndSortedArticles = useMemo(() => {
    if (!articles) return [];

    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((article: any) => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((article: any) => 
        article.title.toLowerCase().includes(lowerSearch) ||
        article.description.toLowerCase().includes(lowerSearch) ||
        article.tags.some((tag: string) => tag.toLowerCase().includes(lowerSearch))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [articles, selectedCategory, searchTerm, sortOption]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search articles by title, description, or tags..."
        />
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <CategoryFilter 
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
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
          {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length !== 1 ? 's' : ''} found
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
          <p className="text-destructive mb-4">Failed to load articles</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-ieee-blue-100 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredAndSortedArticles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-2">No articles found</p>
          <p className="text-muted-foreground">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your filters' 
              : 'No articles available yet'}
          </p>
        </div>
      )}

      {/* Articles Grid */}
      {!isLoading && !isError && filteredAndSortedArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
