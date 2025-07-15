// @/components/skeleton/pricing/PricingPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PricingPageSkeleton() {
  return (
    <div className="py-10 px-4 md:px-6 w-full max-w-7xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-5 w-2/3 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full rounded-md" />
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
