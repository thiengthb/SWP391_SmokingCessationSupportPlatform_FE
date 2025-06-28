import type { User } from "./user";

export interface ChatMessage {
  id?: string;
  author: User;
  content: string;
  timestamp?: string;
}