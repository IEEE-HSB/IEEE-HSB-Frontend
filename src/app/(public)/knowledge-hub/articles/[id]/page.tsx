'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useArticleById } from '@/hooks/useArticleById';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { formatDate } from '@/utils/formatDate';
import RelatedArticles from '@/components/knowledge-hub/RelatedArticles';
import { toast } from 'react-hot-toast';

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: article, isLoading, isError } = useArticleById(id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button onClick={() => router.push('/knowledge-hub/articles')}>
          Back to Articles
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
          onClick={() => router.push('/knowledge-hub/articles')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Button>
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-ieee-blue-100 text-white rounded-full mb-4">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          {article.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Button */}
        <Button onClick={handleShare} variant="outline" className="gap-2 mb-8">
          <Share2 className="w-4 h-4" />
          Share Article
        </Button>
      </motion.div>

      {/* Cover Image */}
      {article.coverImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-4 mb-12"
        >
          <div className="relative w-full max-h-[500px] overflow-hidden rounded-lg">
            <ImageWithFallback
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Main Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Key Technologies</h2>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </section>
        </div>
      </motion.div>

      {/* Related Articles */}
      <RelatedArticles currentArticleId={article._id} category={article.category} />
    </div>
  );
}
