import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityPageSkeleton() {
  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="grid lg:grid-cols-[1fr_250px] gap-8">
        <Card className="p-4 space-y-4 h-[60vh]">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
          <div className="flex gap-2 pt-4 border-t mt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-3/4" />
          ))}
        </Card>
      </div>
    </div>
  );
}
