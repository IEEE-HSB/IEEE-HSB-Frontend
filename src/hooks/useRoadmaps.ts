import { useQuery } from '@tanstack/react-query';
import { Roadmap } from '@/types/knowledge-hub';
import { mockRoadmaps } from '@/lib/mock-data';

export function useRoadmaps() {
  return useQuery<Roadmap[]>({
    queryKey: ['knowledge-hub-roadmaps'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockRoadmaps;
    },
  });
}
