import { UserProfile, LevelID } from '../types';

const USERS_KEY = 'eduana_users';
const CURRENT_USER_KEY = 'eduana_current_user';

// Mock Firebase-like User object
export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export const authService = {
  async register(email: string, pass: string) {
    const uid = Math.random().toString(36).substring(2, 15);
    const user: MockUser = {
      uid,
      email,
      displayName: email.split('@')[0],
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async login(email: string, pass: string) {
    const user: MockUser = {
      uid: 'mock-uid-123',
      email,
      displayName: email.split('@')[0],
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async googleLogin() {
    const user: MockUser = {
      uid: 'google-uid-456',
      email: 'google.user@example.com',
      displayName: 'Google Student',
      photoURL: 'https://picsum.photos/seed/google/100/100',
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return users[uid] || null;
  },

  async createUserProfile(user: MockUser, levelId: LevelID) {
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      selectedLevel: levelId,
      totalPoints: 0,
      createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
      isPremium: false,
      photoURL: user.photoURL,
    };
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    users[user.uid] = profile;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return profile;
  },

  async updateLevel(uid: string, levelId: LevelID) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[uid]) {
      users[uid].selectedLevel = levelId;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },

  async addPoints(uid: string, amount: number) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[uid]) {
      users[uid].totalPoints += amount;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },

  onAuthChange(callback: (user: MockUser | null) => void) {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    callback(user);
    return () => {}; // No-op unsubscribe
  }
};
