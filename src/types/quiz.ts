export type UserRole = "chairperson" | "director" | "volunteer" | "participant";

export type Chapter = "CS" | "RAS" | "PES" | "COMSOC" | "WIE";

export type Committee =
  | "Web Development"
  | "Cyber Security"
  | "Mobile Application"
  | "Machine learning"
  | "JavaScript"
  | "Robotics"
  | "Embedded Systems"
  | "Basic Industrial Automation"
  | "Advanced Industrial Automation"
  | "Distribution-CAD"
  | "Distribution-REVIT"
  | "Analog IC Design"
  | "Digital IC Design"
  | "Graphics Design"
  | "Marketing"
  | "FR"
  | "Multimedia"
  | "PR"
  | "HR"
  | "L&D"
  | "R&D";
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
export type Difficulty = "easy" | "medium" | "hard";
export interface Quiz {
  chapter: string;
  id: string;
  title: string;
  description: string;
  committee?: Committee;
  points: number;
  questions: number;
  timeLimit: number;
  isGeneral: boolean;
  startDate: string;
  durationDays: number;
  difficulty: Difficulty;
  quizQuestions: QuizQuestion[];
}
export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number;
}

export const chapterCommittees: Record<Chapter, Committee[]> = {
  CS: [
    "Web Development",
    "Cyber Security",
    "Mobile Application",
    "Machine learning",
    "JavaScript",
  ],
  RAS: [
    "Robotics",
    "Embedded Systems",
    "Basic Industrial Automation",
    "Advanced Industrial Automation",
  ],
  PES: [
    "Distribution-CAD",
    "Distribution-REVIT",
    "Analog IC Design",
    "Digital IC Design",
  ],
  COMSOC: ["Graphics Design", "Marketing", "FR", "Multimedia", "PR"],
  WIE: ["HR", "L&D", "R&D"],
};


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
