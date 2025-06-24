import type { User } from './user';

export interface ChatMessage {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  isSystem?: boolean;
}