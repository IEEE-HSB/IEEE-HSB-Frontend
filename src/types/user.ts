import { Committee, UserRole } from "./quiz";

export type UserType ={
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  chapterId: string;
  committee?: Committee;
  status: string;
  level: string;
  badges: string[];
  points?: number;
  createdAt: string;
  updatedAt: string;
} 