import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/Editor";
import type { BlogPost } from "@/types/models/blog";

const BlogEditPage = () => {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    tags: [],
    category: "Tips",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log(post);
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            placeholder="Enter post excerpt"
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Editor
            value={post.content || ""}
            onChange={(content) => setPost({ ...post, content })}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Post</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditPage;
