import type { BlogPost } from "@/types/models/blog";

export const blogPosts: BlogPost[] = [
  // Health Category
  {
    id: "1",
    title: "The First 30 Days After Quitting: What to Expect",
    slug: "first-30-days-after-quitting",
    excerpt: "A comprehensive guide to the physical and mental changes in your first month smoke-free.",
    content: "Detailed content about the journey...",
    categoryName: "Health",
    authorName: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-03-15"),
    readingTime: 8,
    coverImage: "/blog/health-1.jpg",
  },
  {
    id: "health-1",
    title: "Understanding Nicotine Withdrawal: A Week-by-Week Guide",
    slug: "nicotine-withdrawal-guide",
    excerpt: "Follow our comprehensive guide to understand and manage withdrawal symptoms effectively.",
    content: "Detailed medical content...",
    categoryName: "Health",
    authorName: "Dr. Rachel Chen",
    publishedAt: new Date("2024-03-20"),
    readingTime: 8,
    coverImage: "/blog/withdrawal-guide.jpg",
  },
  {
    id: "health-2",
    title: "The Impact of Smoking on Your Heart Health",
    slug: "smoking-heart-health",
    excerpt: "Learn how quitting smoking can dramatically improve your cardiovascular health.",
    content: "Heart health details...",
    categoryName: "Health",
    authorName: "Dr. Mark Thompson",
    publishedAt: new Date("2024-03-19"),
    readingTime: 6,
    coverImage: "/blog/heart-health.jpg",
  },
  {
    id: "health-3",
    title: "Breathing Exercises for Ex-Smokers",
    slug: "breathing-exercises",
    excerpt: "Simple yet effective breathing techniques to improve lung capacity.",
    content: "Exercise instructions...",
    categoryName: "Health",
    authorName: "Sarah Miller",
    publishedAt: new Date("2024-03-18"),
    readingTime: 5,
    coverImage: "/blog/breathing.jpg",
  },
  {
    id: "health-4",
    title: "Nutrition Tips for Smoking Cessation",
    slug: "nutrition-for-quitting",
    excerpt: "What to eat and drink to support your body during smoking cessation.",
    content: "Nutrition guidance...",
    categoryName: "Health",
    authorName: "Emma Davis",
    publishedAt: new Date("2024-03-17"),
    readingTime: 7,
    coverImage: "/blog/nutrition.jpg",
  },

  // Tips Category
  {
    id: "2",
    title: "5 Effective Strategies to Handle Nicotine Cravings",
    slug: "handle-nicotine-cravings",
    excerpt: "Learn proven techniques to manage and overcome your cravings.",
    content: "Detailed strategies...",
    categoryName: "Tips",
    authorName: "Michael Chen",
    publishedAt: new Date("2024-03-16"),
    readingTime: 5,
    coverImage: "/blog/tips-1.jpg",
  },

  // Stories Category
  {
    id: "3",
    title: "From Pack-a-Day to Marathon Runner: Emma's Story",
    slug: "emma-success-story",
    excerpt: "How one woman transformed her life after quitting smoking.",
    content: "Emma's inspiring journey...",
    categoryName: "Stories",
    authorName: "Emma Wilson",
    publishedAt: new Date("2024-03-17"),
    readingTime: 6,
    coverImage: "/blog/story-1.jpg",
  },

  // Additional posts for each category...
  {
    id: "5",
    title: "Understanding Withdrawal Symptoms",
    slug: "understanding-withdrawal",
    excerpt: "A medical perspective on managing withdrawal symptoms effectively.",
    categoryName: "Health",
    authorName: "Dr. Lisa Park",
    publishedAt: new Date("2024-03-19"),
    readingTime: 7,
    coverImage: "/blog/health-2.jpg",
    content: "Detailed medical information..."
  }
];
