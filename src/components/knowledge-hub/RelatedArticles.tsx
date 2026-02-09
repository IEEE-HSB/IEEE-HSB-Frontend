'use client';

import { motion } from 'framer-motion';
import { ArticleCategory } from '@/types/knowledge-hub';
import { useArticles } from '@/hooks/useArticles';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  currentArticleId: string;
  category: ArticleCategory;
}

export default function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
  const { data: articles } = useArticles();

  // Get related articles from the same category
  const relatedArticles = articles
    ?.filter(article => 
      article._id !== currentArticleId && 
      article.category === category
    )
    .slice(0, 3);

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-background to-ieee-blue-100/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article, index) => (
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
        </motion.div>
      </div>
    </section>
  );
}
