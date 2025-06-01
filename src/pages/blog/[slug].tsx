import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "./data";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container py-10 px-4 mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate("/blog")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <article className="max-w-3xl mx-auto">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8 text-muted-foreground">
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
}
