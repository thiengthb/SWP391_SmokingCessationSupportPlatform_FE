import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, CheckCircle } from "lucide-react";
import { testimonials } from "@/utils/mockdata/testimonials";
import { TestimonialAvatar } from "./components/TestimonialAvatar";

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredTestimonials = testimonials
    .filter((t) => {
      if (filter === "verified") return t.verified;
      if (filter === "highest") return t.rating === 5;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent")
        return (
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container px-5 sm:px-2 py-10 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Read inspiring stories from people who successfully quit smoking using
          our platform
        </p>
      </div>

      <div className="flex justify-between items-end mb-8 flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Filter Stories</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stories</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredTestimonials.length} stories
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <TestimonialAvatar
                src={testimonial.avatar}
                alt={testimonial.author}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{testimonial.author}</h3>
                  {testimonial.verified && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>

            <div className="flex mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-muted-foreground mb-4">{testimonial.text}</p>

            {testimonial.highlight && (
              <blockquote className="border-l-2 border-primary pl-4 italic mb-4">
                "{testimonial.highlight}"
              </blockquote>
            )}

            <div className="flex flex-wrap gap-2">
              {testimonial.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              {new Date(testimonial.date).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No testimonials found matching your filters.
        </div>
      )}
    </div>
  );
}
