
export type GalleryType = {
  id: string,
  title: string,
  description: string,
  image: string,
  chapterId?: string,
}

export type ChapterFilter = 'ALL' | 'WIE' | 'CS' | 'PES' | 'RAS' | 'COMSOC';
