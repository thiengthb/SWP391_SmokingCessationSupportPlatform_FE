export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  categoryName: string;
  excerpt: string;
  content: string;
  readingTime: number; 
  coverImage: string;
  publishedAt: Date;
}
