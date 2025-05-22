
export type MoodType = 'happy' | 'calm' | 'okay' | 'sad' | 'anxious' | 'stressed';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  note?: string;
  timestamp: number;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
}

export interface TherapyTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompts: string[];
}
