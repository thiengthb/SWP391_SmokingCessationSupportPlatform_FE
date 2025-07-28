import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar } from "lucide-react";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@/data/blog.data";

function FallbackImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <ImageOff className="h-12 w-12 text-gray-400" />
    </div>
  );
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Health":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Tips":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Stories":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "Research":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function BlogCard({ post }: { post: BlogPost }) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
      <div className="aspect-video overflow-hidden bg-muted relative">
        {imageError ? (
          <FallbackImage />
        ) : (
          <img
            src={post.imageUrl}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        )}
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(post.categoryName)} border-0`}>
            {post.categoryName === "Health" && "Sức khỏe"}
            {post.categoryName === "Tips" && "Mẹo hay"}
            {post.categoryName === "Stories" && "Câu chuyện"}
            {post.categoryName === "Research" && "Nghiên cứu"}
            {!["Health", "Tips", "Stories", "Research"].includes(
              post.categoryName
            ) && post.categoryName}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col gap-4 h-full">
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} phút đọc</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
