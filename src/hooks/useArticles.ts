import { useQuery } from '@tanstack/react-query';
import { KnowledgeArticle } from '@/types/knowledge-hub';
import { mockArticles } from '@/lib/mock-data';

export function useArticles() {
  return useQuery<KnowledgeArticle[]>({
    queryKey: ['knowledge-hub-articles'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockArticles;
    },
  });
}
