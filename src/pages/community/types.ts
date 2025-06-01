export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  category: 'Support' | 'Discussion' | 'Success Stories' | 'Tips';
  likes: number;
  replies: number;
  createdAt: string;
  tags: string[];
  isStickied?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  isSystem?: boolean;
}
