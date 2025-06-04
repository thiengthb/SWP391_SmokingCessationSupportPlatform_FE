import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  // Health Category
  {
    id: "1",
    title: "The First 30 Days After Quitting: What to Expect",
    slug: "first-30-days-after-quitting",
    excerpt: "A comprehensive guide to the physical and mental changes in your first month smoke-free.",
    content: "Detailed content about the journey...",
    category: "Health",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Health Expert",
      avatar: "/avatars/sarah.jpg"
    },
    publishedAt: "2024-03-15",
    readingTime: "8 min",
    coverImage: "/blog/health-1.jpg",
    tags: ["health", "beginner", "recovery"]
  },
  {
    id: "health-1",
    title: "Understanding Nicotine Withdrawal: A Week-by-Week Guide",
    slug: "nicotine-withdrawal-guide",
    excerpt: "Follow our comprehensive guide to understand and manage withdrawal symptoms effectively.",
    content: "Detailed medical content...",
    category: "Health",
    author: {
      name: "Dr. Rachel Chen",
      role: "Addiction Specialist",
      avatar: "/avatars/rachel.jpg"
    },
    publishedAt: "2024-03-20",
    readingTime: "8 min",
    coverImage: "/blog/withdrawal-guide.jpg",
    tags: ["health", "withdrawal", "medical"]
  },
  {
    id: "health-2",
    title: "The Impact of Smoking on Your Heart Health",
    slug: "smoking-heart-health",
    excerpt: "Learn how quitting smoking can dramatically improve your cardiovascular health.",
    content: "Heart health details...",
    category: "Health",
    author: {
      name: "Dr. Mark Thompson",
      role: "Cardiologist",
      avatar: "/avatars/mark.jpg"
    },
    publishedAt: "2024-03-19",
    readingTime: "6 min",
    coverImage: "/blog/heart-health.jpg",
    tags: ["health", "heart", "cardiovascular"]
  },
  {
    id: "health-3",
    title: "Breathing Exercises for Ex-Smokers",
    slug: "breathing-exercises",
    excerpt: "Simple yet effective breathing techniques to improve lung capacity.",
    content: "Exercise instructions...",
    category: "Health",
    author: {
      name: "Sarah Miller",
      role: "Respiratory Therapist",
      avatar: "/avatars/sarah-m.jpg"
    },
    publishedAt: "2024-03-18",
    readingTime: "5 min",
    coverImage: "/blog/breathing.jpg",
    tags: ["health", "exercise", "lungs"]
  },
  {
    id: "health-4",
    title: "Nutrition Tips for Smoking Cessation",
    slug: "nutrition-for-quitting",
    excerpt: "What to eat and drink to support your body during smoking cessation.",
    content: "Nutrition guidance...",
    category: "Health",
    author: {
      name: "Emma Davis",
      role: "Nutritionist",
      avatar: "/avatars/emma-d.jpg"
    },
    publishedAt: "2024-03-17",
    readingTime: "7 min",
    coverImage: "/blog/nutrition.jpg",
    tags: ["health", "nutrition", "diet"]
  },

  // Tips Category
  {
    id: "2",
    title: "5 Effective Strategies to Handle Nicotine Cravings",
    slug: "handle-nicotine-cravings",
    excerpt: "Learn proven techniques to manage and overcome your cravings.",
    content: "Detailed strategies...",
    category: "Tips",
    author: {
      name: "Michael Chen",
      role: "Cessation Counselor",
      avatar: "/avatars/michael.jpg"
    },
    publishedAt: "2024-03-16",
    readingTime: "5 min",
    coverImage: "/blog/tips-1.jpg",
    tags: ["tips", "cravings", "strategies"]
  },

  // Stories Category
  {
    id: "3",
    title: "From Pack-a-Day to Marathon Runner: Emma's Story",
    slug: "emma-success-story",
    excerpt: "How one woman transformed her life after quitting smoking.",
    content: "Emma's inspiring journey...",
    category: "Stories",
    author: {
      name: "Emma Wilson",
      role: "Community Member",
      avatar: "/avatars/emma.jpg"
    },
    publishedAt: "2024-03-17",
    readingTime: "6 min",
    coverImage: "/blog/story-1.jpg",
    tags: ["success", "motivation", "fitness"]
  },

  // Additional posts for each category...
  {
    id: "5",
    title: "Understanding Withdrawal Symptoms",
    slug: "understanding-withdrawal",
    excerpt: "A medical perspective on managing withdrawal symptoms effectively.",
    category: "Health",
    author: {
      name: "Dr. Lisa Park",
      role: "Medical Researcher",
      avatar: "/avatars/lisa.jpg"
    },
    publishedAt: "2024-03-19",
    readingTime: "7 min",
    coverImage: "/blog/health-2.jpg",
    tags: ["health", "withdrawal", "symptoms"],
    content: "Detailed medical information..."
  }
];
