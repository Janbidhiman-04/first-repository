import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 'L1',
    name: 'Playschool - UKG',
    description: 'Basic identification, rhymes, tracing',
    ageRange: 'Ages 3-5',
  },
  {
    id: 'L2',
    name: '1st - 5th Grade',
    description: 'Grammar basics, vocabulary, number skills',
    ageRange: 'Ages 6-10',
  },
  {
    id: 'L3',
    name: '6th - 8th Grade',
    description: 'Advanced grammar, programming basics, experiments',
    ageRange: 'Ages 11-13',
  },
  {
    id: 'L4',
    name: '8th - 10th Grade',
    description: 'Subject deep learning, board prep, career knowledge',
    ageRange: 'Ages 13-16',
  },
  {
    id: 'L5',
    name: '10th - 12th Grade',
    description: 'Arts, Medical (PCB), Non-Medical (PCM) streams',
    ageRange: 'Ages 15-18',
  },
  {
    id: 'L6',
    name: 'College Level',
    description: 'University students: Course-based learning',
    ageRange: 'University',
  },
  {
    id: 'L7',
    name: 'Competitive Exams',
    description: 'JEE, NEET, GATE, UPSC, etc.',
    ageRange: 'Aspirants',
  },
];

export const APP_COLORS = {
  primary: '#4A90E2', // Calm Blue
  secondary: '#F5A623', // Energetic Orange
  accent: '#7ED321', // Growth Green
  background: '#F8FAFC',
  text: '#1E293B',
};

export const REWARD_POINTS = {
  DAILY_LOGIN: 5,
  HOURLY_ACTIVITY: 10,
  WEEKLY_TASK: 15,
  COMPLETE_QUIZ: 20,
  SOLVE_PUZZLE: 15,
  FIX_THE_BUG: 25,
  UPLOAD_PDF: 10,
  SHARE_APP: 50,
  COMPLETE_DAILY_TASKS: 100,
};
