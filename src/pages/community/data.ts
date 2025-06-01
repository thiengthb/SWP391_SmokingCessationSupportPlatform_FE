import type { ForumPost } from "./types";
import type { User, ChatMessage } from "./types";


export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Starting My Quit Journey Today!",
    content: "After 10 years of smoking, I'm finally taking the first step...",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      role: "Member"
    },
    category: "Support",
    likes: 24,
    replies: 12,
    createdAt: "2024-03-18",
    tags: ["beginner", "motivation"],
    isStickied: true
  },
  // Add more posts...
];

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
