export interface Announcement {
  id: string;
  title: string;
  description: string;
  link?: string;
  createdAt: string; 
}

export type AnnouncementsData = Announcement[];
export type AnnouncementType = Announcement;
