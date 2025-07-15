import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <Skeleton className="h-8 w-2/3 mx-auto mb-4" /> {/* Title */}
          <Skeleton className="h-5 w-3/5 mx-auto mb-4" /> {/* Subtitle */}
          <Skeleton className="h-6 w-36 mx-auto" /> {/* Badge */}
        </div>

        {/* Alert */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <Skeleton className="h-4 w-5/6" />
        </Alert>

        {/* Terms Section Cards (fake 3 items) */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
