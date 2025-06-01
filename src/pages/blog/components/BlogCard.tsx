import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "../types";

function FallbackImage() {
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <ImageOff className="h-12 w-12 text-muted-foreground" />
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group h-full">
      <div className="aspect-video overflow-hidden bg-muted">
        {imageError ? (
          <FallbackImage />
        ) : (
          <img
            src={post.coverImage}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-3">
        <Badge className="w-fit">{post.category}</Badge>
        <h2 className="text-xl font-semibold overflow-hidden text-ellipsis line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-muted-foreground overflow-hidden text-ellipsis line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-auto pt-4">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm text-muted-foreground">{post.readingTime}</span>
        </div>
      </div>
    </Card>
  );
}
