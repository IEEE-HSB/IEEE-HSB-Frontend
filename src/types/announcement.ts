export interface Announcement {
  id: number;
  title: string;
  description: string;
  link?: string;
  createdAt: string; 
}

export type AnnouncementsData = Announcement[];
