import { Timestamp } from 'firebase/firestore';

export type LevelID = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

export interface Level {
  id: LevelID;
  name: string;
  description: string;
  ageRange: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  phoneNumber?: string;
  displayName: string;
  selectedLevel: LevelID;
  stream?: 'Arts' | 'Medical' | 'Non-Medical';
  course?: string;
  examGoal?: string;
  totalPoints: number;
  createdAt: Timestamp;
  isPremium: boolean;
  photoURL?: string;
}

export type ContentType = 'video' | 'text' | 'quiz' | 'game';

export interface ContentItem {
  id: string;
  levelId: LevelID;
  subject: string;
  topic: string;
  title: string;
  contentType: ContentType;
  videoUrl?: string;
  textContent?: string;
  thumbnailUrl?: string;
  pointsReward: number;
  isPremium: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  contentId: string;
  questions: QuizQuestion[];
}

export interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  timestamp: Timestamp;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: Timestamp;
}
