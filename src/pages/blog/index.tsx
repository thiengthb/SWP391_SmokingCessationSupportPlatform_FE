import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogCard } from "./components/BlogCard";
import { BlogPageSkeleton } from "../../components/skeleton/BlogSkeleton";
import { blogPosts } from "@/utils/mockdata/blog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Role } from "@/types/enums/Role";

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false); // Add loading state

  const { auth } = useAuth();

  // Simulate loading for demo purposes
  // Remove this and replace with actual data fetching logic
  if (isLoading) {
    return <BlogPageSkeleton />;
  }

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || post.categoryName === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col py-10 px-4 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">
          Insights and tips for your journey
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row item-center gap-4">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Tabs
            defaultValue="all"
            onValueChange={(v) => setCategory(v === "all" ? null : v)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Health">Health</TabsTrigger>
              <TabsTrigger value="Tips">Tips</TabsTrigger>
              <TabsTrigger value="Stories">Stories</TabsTrigger>
              <TabsTrigger value="Research">Research</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {auth.currentAcc?.role === Role.ADMIN && (
          <Link to="/blog/management/edit">
            <Button>
              <Plus className="w-4 h-4" />
              <p className="pr-3">New Post</p>
            </Button>
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block h-full"
          >
            <BlogCard post={post} />
          </Link>
        ))}
      </div>

      {filteredPosts.length > ITEMS_PER_PAGE && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No posts found matching your criteria
        </div>
      )}
    </div>
  );
}
