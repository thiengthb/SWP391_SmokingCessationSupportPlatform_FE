import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function StoryPageSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto py-6 lg:py-10">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <Skeleton className="h-8 w-2/3 mx-auto" /> {/* Title */}
          <Skeleton className="h-5 w-1/2 mx-auto" /> {/* Subtitle */}
        </div>

        <Card className="border-none shadow-none">
          <CardContent className="grid gap-8">
            {/* Mission Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" /> {/* Mission Title */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" /> {/* Goals Title */}
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6 space-y-3">
                      <Skeleton className="h-6 w-1/4" /> {/* Year */}
                      <Skeleton className="h-5 w-3/4" /> {/* Title */}
                      <Skeleton className="h-4 w-full" /> {/* Description */}
                      <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Join Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" /> {/* Join Title */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-40" /> {/* Button */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
