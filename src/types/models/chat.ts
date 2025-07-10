import type { Account } from "./account";

export interface ChatMessage {
  id: string;
  author: Account;
  content: string;
  timestamp?: string;
}