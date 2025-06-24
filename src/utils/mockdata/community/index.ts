import type { ChatMessage } from "@/types/community/chat";
import type { User } from "@/types/community/user";

export const onlineUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/avatars/john.jpg",
    status: "online",
    lastSeen: new Date().toISOString()
  },
  {
    id: "2",
    name: "Sarah Smith",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    lastSeen: new Date().toISOString()
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    content: "👋 Welcome to the community chat!",
    author: {
      id: "system",
      name: "System",
      status: "online"
    },
    timestamp: new Date().toISOString(),
    isSystem: true
  }
];
