import type { Account } from "./Account";

export interface ChatMessage {
  id: string;
  author: Account;
  content: string;
  timestamp?: string;
}