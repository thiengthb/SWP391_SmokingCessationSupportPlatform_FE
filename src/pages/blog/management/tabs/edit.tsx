import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/pages/blog/components/Editor";
import type { BlogPost } from "@/types/models/blog";
import useApi from "@/hooks/useApi";
import type { Category } from "@/types/models/category";

const BlogEditPage = () => {
  const apiWithInterceptor = useApi();
  const [, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    categoryName: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiWithInterceptor.get(
          "/v1/categories/list-all"
        );
        console.log("Fetched categories:", response.data);
        setCategories(response.data.result.content);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

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
