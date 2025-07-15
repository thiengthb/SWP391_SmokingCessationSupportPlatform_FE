import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForgotPasswordSkeleton() {
  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      </Card>
    </div>
  );
}
