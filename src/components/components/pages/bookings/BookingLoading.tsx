import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingListLoading() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Loading Bookings...</h2>

      <div className="overflow-x-auto">
        {/* Header */}
        <Card className="bg-muted text-muted-foreground min-w-[622px]">
          <CardContent className="p-4 flex gap-4 font-semibold">
            <div className="flex-1 min-w-[120px]">Tour</div>
            <div className="flex-[2] min-w-[200px]">Order ID</div>
            <div className="w-[80px] text-right">Payment</div>
            <div className="w-[60px] text-center">People</div>
            <div className="w-[110px] text-right">Start Date</div>
          </CardContent>
        </Card>

        {/* Skeleton Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Card
            key={i}
            className="min-w-[622px] animate-pulse bg-muted/40 my-1"
          >
            <CardContent className="p-4 flex gap-4 items-center">
              <Skeleton className="flex-1 h-4 min-w-[120px]" />
              <Skeleton className="flex-[2] h-4 min-w-[200px]" />
              <Skeleton className="w-[80px] h-4" />
              <Skeleton className="w-[60px] h-4" />
              <Skeleton className="w-[110px] h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
