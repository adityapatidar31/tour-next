import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";

export default function NoBookings() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-10 text-center">
          {/* < /> */}
          <Plane className="text-muted-foreground text-violet-500 w-10 h-10" />
          <h2 className="text-xl font-semibold text-muted-foreground">
            No Bookings Found
          </h2>
          <p className="text-sm text-muted-foreground">
            Looks like you haven’t booked any tours yet. Take your first Trip .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
