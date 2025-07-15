import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPageSkeleton() {
  return (
    <div className="container max-w-3xl xl:max-w-6xl 2xl:max-w-[1240px] px-5 py-6 lg:py-10 xl:py-16 2xl:py-32 mx-auto">
      <div className="flex justify-between flex-col xl:flex-row gap-6 xl:gap-12 2xl:gap-20 relative">
        {/* Skeleton cho ContactForm */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-1/2" /> {/* Tiêu đề form */}
          <Skeleton className="h-10 w-full" /> {/* Input 1 */}
          <Skeleton className="h-10 w-full" /> {/* Input 2 */}
          <Skeleton className="h-10 w-full" /> {/* Input 3 */}
          <Skeleton className="h-32 w-full" /> {/* Textarea */}
          <Skeleton className="h-10 w-32" /> {/* Submit button */}
        </div>

        {/* Skeleton cho ContactInfo */}
        <div className="flex-1 space-y-6">
          <Skeleton className="h-6 w-40" /> {/* Tiêu đề info */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
