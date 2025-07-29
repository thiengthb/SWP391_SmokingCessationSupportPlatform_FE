import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  BookOpen,
} from "lucide-react";
import { blogPosts } from "@/data/blog.data";
import { useState } from "react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20 px-4 mx-auto text-center">
        <div className="max-w-md mx-auto">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button
            onClick={() => navigate("/blog")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại Blog
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health":
        return "bg-green-100 text-green-800";
      case "Tips":
        return "bg-blue-100 text-blue-800";
      case "Stories":
        return "bg-purple-100 text-purple-800";
      case "Research":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-6 px-4 mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại Blog
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 px-4 mx-auto">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                className={`${getCategoryColor(post.categoryName)} border-0`}
              >
                {post.categoryName === "Health" && "Sức khỏe"}
                {post.categoryName === "Tips" && "Mẹo hay"}
                {post.categoryName === "Stories" && "Câu chuyện"}
                {post.categoryName === "Research" && "Nghiên cứu"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="ml-auto"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            {imageError ? (
              <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-gray-400" />
              </div>
            ) : (
              <img
                src={post.imageUrl}
                alt={post.title}
                onError={() => setImageError(true)}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
            )}
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12 shadow-sm border-0">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </div>

              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </Card>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thẻ bài viết
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="mt-12">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Khám phá thêm các bài viết khác
              </h3>
              <p className="text-gray-600 mb-4">
                Tiếp tục hành trình cai thuốc của bạn với những bài viết hữu ích
                khác.
              </p>
              <Button
                onClick={() => navigate("/blog")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Xem tất cả bài viết
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Card>
          </div>
        </article>
      </div>
    </div>
  );
}
