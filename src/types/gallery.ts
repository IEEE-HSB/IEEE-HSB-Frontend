export interface GalleryItem {
  id: number;
  chapterId: string;
  title: string;
  image: string;
}

export type ChapterFilter = 'All' | 'WIE' | 'CS' | 'PES' | 'RAS' | 'IAS' | 'EMBS' | 'MTT-S';
