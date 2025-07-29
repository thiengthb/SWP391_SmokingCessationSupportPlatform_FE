import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-card block h-full">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogPageSkeleton() {
  return (
    <div className="flex flex-col py-10 px-4 mx-auto">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-32 mx-auto mb-4" />
        <Skeleton className="h-5 w-64 mx-auto" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row item-center gap-4">
          <Skeleton className="h-10 max-w-sm w-80" />
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-md" />
            ))}
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1">
            <Skeleton className="h-10 w-20 rounded-md" />
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-md" />
            ))}
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
