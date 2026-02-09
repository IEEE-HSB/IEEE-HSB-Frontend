'use client';

import { ArticleCategory, KnowledgeFilter, RoadmapCategory, RoadmapFilter } from '@/types/knowledge-hub';

interface CategoryFilterProps {
  activeCategory: KnowledgeFilter | RoadmapFilter;
  onCategoryChange: (category: KnowledgeFilter | RoadmapFilter) => void;
  type?: 'article' | 'roadmap';
}

const articleCategories: (KnowledgeFilter)[] = [
  'All',
  'Tutorial',
  'Research',
  'Tech News',
  'Best Practices',
  'Case Study',
];

const roadmapCategories: (RoadmapFilter)[] = [
  'All',
  'Software Engineering',
  'Power Systems',
  'Robotics',
  'Communications',
  'AI & ML',
  'Embedded Systems',
];

export default function CategoryFilter({ 
  activeCategory, 
  onCategoryChange,
  type = 'article' 
}: CategoryFilterProps) {
  const categories = type === 'article' ? articleCategories : roadmapCategories;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Category:
      </span>
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-ieee-blue-100 text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
