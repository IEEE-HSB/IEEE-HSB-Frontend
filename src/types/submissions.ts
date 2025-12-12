import { Committee } from "./quiz";

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  volunteerId: string;
  volunteerName: string;
  committee: Committee;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  fileUrl?: string;
}