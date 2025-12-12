import { Committee, UserRole } from "./quiz";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  committee?: Committee;
  avatar?: string;
  points?: number;
  rank?: number;
}