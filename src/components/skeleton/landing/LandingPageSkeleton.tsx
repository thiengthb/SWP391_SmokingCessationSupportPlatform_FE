import { Skeleton } from "@/components/ui/skeleton";

export default function LandingPageSkeleton() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-muted/50 text-center">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-5 w-3/4 mb-6" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <Skeleton className="h-8 w-64 mb-6 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-80" />
                ))}
              </div>
              <Skeleton className="h-10 w-32 mt-8" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container px-4 mx-auto text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto mb-8" />
          <Skeleton className="h-10 w-36 mx-auto" />
        </div>
      </section>
    </main>
  );
}
