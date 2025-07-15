import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export default function TeamPageSkeleton() {
  return (
    <div className="container max-w-3xl lg:max-w-6xl mx-auto px-4 py-6 lg:py-10">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-2/3 mx-auto" /> {/* Title */}
            <Skeleton className="h-5 w-1/2 mx-auto" /> {/* Subtitle */}
          </div>

          {/* Team Members (Fake 4 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="text-center items-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                  </Avatar>
                  <CardTitle className="text-xl font-bold">
                    <Skeleton className="h-5 w-1/2 mx-auto" />
                  </CardTitle>
                  <Skeleton className="h-4 w-1/3 mx-auto mt-2" /> {/* Role */}
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-4/5 mx-auto mt-2" />
                  <Skeleton className="h-4 w-3/5 mx-auto mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-6 text-center">
          <Skeleton className="h-6 w-1/4 mx-auto" /> {/* Get in touch title */}
          <Skeleton className="h-4 w-2/3 mx-auto" /> {/* Description */}
          <div className="pt-6">
            <Skeleton className="h-10 w-40 mx-auto rounded-md" /> {/* Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
