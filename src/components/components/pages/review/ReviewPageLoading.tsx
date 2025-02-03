import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewPageLoader() {
  return (
    <div className="px-12 min-w-[615px]">
      <h1 className="text-3xl font-bold mb-6">Your Reviews</h1>
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="flex gap-4 p-4 shadow-md">
            <Skeleton className="w-32 h-24 rounded-lg" />
            <CardContent className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
