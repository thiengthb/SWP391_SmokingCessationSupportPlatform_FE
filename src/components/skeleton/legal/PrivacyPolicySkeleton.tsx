import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText } from "lucide-react";

export default function PrivacyPolicySkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <Skeleton className="h-8 w-2/3 mx-auto mb-4" /> {/* Title */}
          <Skeleton className="h-6 w-36 mx-auto" /> {/* Badge */}
        </div>

        {/* Content Cards (giả lập 3 mục) */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
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
