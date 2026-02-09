import { useQuery } from '@tanstack/react-query';
import { Roadmap } from '@/types/knowledge-hub';
import { mockRoadmaps } from '@/lib/mock-data';

export function useRoadmapById(id: string) {
  return useQuery<Roadmap>({
    queryKey: ['knowledge-hub-roadmap', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const roadmap = mockRoadmaps.find(r => r._id === id);
      if (!roadmap) throw new Error('Roadmap not found');
      return roadmap;
    },
    enabled: !!id,
  });
}
