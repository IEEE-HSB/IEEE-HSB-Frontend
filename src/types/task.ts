import { Committee } from "./quiz";

export interface Task {
  id: string;
  title: string;
  description: string;
  committee: Committee;
  createdBy: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  points: number;
}