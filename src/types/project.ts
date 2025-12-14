export type ProjectType = {
  id: string;
  title: string;
  description: string;
  image?: string;
  subImgages?: string[];
  chapterId: string;
  createdBy: string;
  link?: string;
  createdAt: string;
  updatedAt: string
  subImages?: string[];}

export type ProjectChapterFilter = 'All' | 'WIE' | 'CS' | 'PES' | 'RAS' | 'COMSOC';
