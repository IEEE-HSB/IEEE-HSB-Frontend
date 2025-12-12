export interface Notification {
  id: string;
  type: 'task' | 'submission' | 'event' | 'announcement' | 'quiz';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
