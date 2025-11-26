export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  chapterId: string;
  author: string;
  link?: string;
  createdAt: string;
}

export type ProjectChapterFilter = 'All' | 'WIE' | 'CS' | 'PES' | 'RAS' | 'IAS' | 'EMBS' | 'MTT-S';
