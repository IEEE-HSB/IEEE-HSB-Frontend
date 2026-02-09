'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { KnowledgeArticle } from '@/types/knowledge-hub';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';

interface ArticleCardProps {
  article: KnowledgeArticle;
}

const categoryColors: Record<string, string> = {
  'Tutorial': 'bg-ieee-blue-100',
  'Research': 'bg-ieee-purple-100',
  'Tech News': 'bg-ieee-aqua-100',
  'Best Practices': 'bg-ieee-green-100',
  'Case Study': 'bg-ieee-gold-100',
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const categoryColor = categoryColors[article.category] || 'bg-ieee-blue-100';

  return (
    <Link href={`/knowledge-hub/articles/${article._id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="h-full bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {article.coverImage ? (
            <ImageWithFallback
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ieee-aqua-100 to-ieee-cyan-100">
              <span className="text-white text-4xl font-bold">
                {article.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 text-xs font-semibold text-white ${categoryColor} rounded-full shadow-lg`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-ieee-blue-100 transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime} min</span>
              </div>
            )}
          </div>

          {/* Read More Button */}
          <Button variant="ghost" size="sm" className="w-full group-hover:bg-ieee-blue-100 group-hover:text-white transition-colors">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
