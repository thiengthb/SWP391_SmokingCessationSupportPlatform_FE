import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQPageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <Skeleton className="h-8 w-2/3 mx-auto mb-2" /> {/* Title */}
        <Skeleton className="h-5 w-1/2 mx-auto" /> {/* Subtitle */}
      </div>

      {/* Fake 3 FAQ sections */}
      {Array.from({ length: 3 }).map((_, sIndex) => (
        <Card key={sIndex} className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <Skeleton className="h-5 w-3/4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 2 }).map((_, qIndex) => (
              <div key={qIndex} className="border-b py-4 space-y-2">
                <Skeleton className="h-4 w-full" /> {/* Question */}
                <Skeleton className="h-4 w-5/6" /> {/* Answer */}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
