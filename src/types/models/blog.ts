export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Health' | 'Tips' | 'Stories' | 'Research';
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
}
