import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPageSkeleton() {
  return (
    <div className="container py-10 px-4 mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-40 mx-auto mb-4" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="h-10 w-full max-w-sm" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </div>

      {/* Blog cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <Skeleton className="h-10 w-10 rounded" />
        <Skeleton className="h-10 w-10 rounded" />
        <Skeleton className="h-10 w-10 rounded" />
      </div>
    </div>
  );
}
