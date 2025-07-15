import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Skeleton className="h-4 w-24 mx-auto" />
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <Skeleton className="h-8 w-64 mx-auto" />
          </h1>
          <div className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section Skeleton */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-6 w-48 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <Button className="gap-2" disabled>
                <Skeleton className="h-4 w-24" />
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-8 w-8 mb-4" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-5/6" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section Skeleton */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 sm:px-10 mx-auto text-center">
          <Skeleton className="h-6 w-48 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-10 mb-2" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
