'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/knowledge-hub/ArticleCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { KnowledgeArticle } from '@/types/knowledge-hub';
import { useArticles } from '@/hooks/useArticles';

export default function KnowledgeHubPage() {
  const { data: articles, isLoading, isError } = useArticles();
  const [featuredArticles, setFeaturedArticles] = useState<KnowledgeArticle[]>([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Get latest 3 articles as featured
      setFeaturedArticles(articles.slice(0, 3));
    }
  }, [articles]);

  return (
    <div className="min-h-screen">
      {/* Featured Articles Section */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-b from-background to-ieee-blue-100/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            Featured Articles
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Latest insights and knowledge from our volunteers
          </p>

          {isLoading && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}

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

          {!isLoading && !isError && featuredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles available yet</p>
            </div>
          )}

          {!isLoading && !isError && featuredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
