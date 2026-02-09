// Knowledge Hub Type Definitions

export type ArticleCategory = 
  | 'Tutorial' 
  | 'Research' 
  | 'Tech News' 
  | 'Best Practices'
  | 'Case Study';

export type RoadmapCategory = 
  | 'Software Engineering'
  | 'Power Systems'
  | 'Robotics'
  | 'Communications'
  | 'AI & ML'
  | 'Embedded Systems'
  | 'Web Development'
  | 'Data Science';

export interface Author {
  _id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface KnowledgeArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string; // short preview
  content: string; // full article (markdown or HTML)
  coverImage?: string;
  author: Author;
  category: ArticleCategory;
  tags: string[];
  publishedAt: Date | string;
  readTime?: number; // estimated minutes
  views?: number;
  likes?: number;
  commentsCount?: number;
  isPublished: boolean;
}

export interface RoadmapTopic {
  title: string;
  description: string;
  estimatedTime: string;
  resources: RoadmapResource[];
}

export interface RoadmapLevel {
  levelNumber: number;
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: 'Article' | 'Video' | 'Course' | 'Documentation' | 'Tutorial';
}

export interface Roadmap {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  category: RoadmapCategory;
  tags: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  author: Author;
  levels: RoadmapLevel[];
  publishedAt: Date | string;
  views?: number;
  enrolledCount?: number;
  isPublished: boolean;
}

export type KnowledgeFilter = 'All' | ArticleCategory;
export type RoadmapFilter = 'All' | RoadmapCategory;

export type SortOption = 'latest' | 'oldest' | 'mostViewed';
