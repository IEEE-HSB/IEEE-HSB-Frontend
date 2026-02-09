import { useQuery } from '@tanstack/react-query';
import { KnowledgeArticle } from '@/types/knowledge-hub';
import { mockArticles } from '@/lib/mock-data';

export function useArticleById(id: string) {
  return useQuery<KnowledgeArticle>({
    queryKey: ['knowledge-hub-article', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const article = mockArticles.find(a => a._id === id);
      if (!article) throw new Error('Article not found');
      return article;
    },
    enabled: !!id,
  });
}
