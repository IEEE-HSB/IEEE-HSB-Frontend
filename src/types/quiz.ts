export type UserRole = 'chairperson' | 'director' | 'volunteer' | 'participant';
export type Committee =
  | 'Web Development'| 'Cyber Security'| 'Mobile Application'
  | 'Robotics'
  | 'Distribution-CAD'| 'Distribution-REVIT' | 'Basic Industrial Automation'  | 'Advanced Industrial Automation'
  | 'Embedded Systems' | 'Machine learning' | 'Analog IC Design'| 'Digital IC Design'
  | 'Graphics Design'| 'JavaScript'
  | 'HR' | 'Marketing' | 'FR' | 'Multimedia' | 'L&D' | 'R&D' | 'PR';

export interface Quiz {
  id: string
  title: string;
  description: string;
  committee?: Committee;
  points: number;
  questions: number;
  timeLimit: number;
  isGeneral: boolean;
}


// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   image?: string;
//   attendees: number;
//   status: 'upcoming' | 'ongoing' | 'completed';
// }