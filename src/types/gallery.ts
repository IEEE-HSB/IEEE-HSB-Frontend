
export type GalleryType = {
  id: string,
  title: string,
  description: string,
  image: string,
  chapterId?: string,
}


export type ChapterFilter = 'All' | 'WIE' | 'CS' | 'PES' | 'RAS' | 'COMSOC';
