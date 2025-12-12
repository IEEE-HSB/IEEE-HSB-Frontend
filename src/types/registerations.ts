import { Committee, UserRole } from "./quiz";
export type Chapter= 'cs' | 'comsoc' | 'wie' | 'ras' | 'pes' | 'general'

export interface Registeration {
  id: string;
  volunteerId: string;
  volunteerName: string;
  chapter: Chapter;
  committee: Committee;
  role: UserRole
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
}