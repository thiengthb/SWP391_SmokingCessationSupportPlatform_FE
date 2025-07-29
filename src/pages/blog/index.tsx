import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogCard } from "./components/BlogCard";
import { BlogPageSkeleton } from "../../components/skeleton/BlogSkeleton";
import { blogPosts } from "@/data/blog.data";
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
    <div className="flex flex-col py-10 px-4 mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs border-gray-300 focus:border-blue-500"
          />
          <Tabs
            defaultValue="all"
            onValueChange={(v) => setCategory(v === "all" ? null : v)}
          >
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="Health"
                className="data-[state=active]:bg-white"
              >
                Sức khỏe
              </TabsTrigger>
              <TabsTrigger
                value="Tips"
                className="data-[state=active]:bg-white"
              >
                Mẹo hay
              </TabsTrigger>
              <TabsTrigger
                value="Stories"
                className="data-[state=active]:bg-white"
              >
                Câu chuyện
              </TabsTrigger>
              <TabsTrigger
                value="Research"
                className="data-[state=active]:bg-white"
              >
                Nghiên cứu
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {auth.currentAcc?.role === Role.ADMIN && (
          <Link to="/blog/management/edit">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài viết mới
            </Button>
          </Link>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không tìm thấy bài viết
          </h3>
          <p className="text-gray-500">
            Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block h-full group"
              >
                <BlogCard post={post} />
              </Link>
            ))}
          </div>

          {filteredPosts.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-blue-50"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className={
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-50"
                        }
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
                          : "cursor-pointer hover:bg-blue-50"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
