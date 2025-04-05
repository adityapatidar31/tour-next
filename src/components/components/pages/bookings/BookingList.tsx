import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/services/types";

interface BookingListProps {
  bookings: Booking[];
  onRowClick: (booking: Booking) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function BookingList({
  bookings,
  onRowClick,
}: BookingListProps) {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Total Bookings: {bookings.length}
      </h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto">
        {/* Header Row */}
        <Card className="bg-muted text-muted-foreground min-w-[600px]">
          <CardContent className="p-4 flex gap-4 font-semibold">
            <div className="flex-1 min-w-[120px]">Tour</div>
            <div className="flex-[2] min-w-[200px]">Order ID</div>
            <div className="w-[80px] text-right">Payment</div>
            <div className="w-[60px] text-center">People</div>
            <div className="w-[110px] text-right">Start Date</div>
          </CardContent>
        </Card>

        {/* Booking Rows */}
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            onClick={() => onRowClick(booking)}
            className="cursor-pointer hover:shadow-md transition-shadow min-w-[600px]"
          >
            <CardContent className="p-4 flex gap-4 text-sm items-center">
              <div className="flex-1 min-w-[120px] truncate">
                {booking.tourName}
              </div>
              <div className="flex-[2] min-w-[200px] truncate">
                {booking.razorpayOrderId}
              </div>
              <div className="w-[80px] text-right">₹{booking.payment}</div>
              <div className="w-[60px] text-center">{booking.people}</div>
              <div className="w-[110px] text-right">
                {formatDate(booking.startDate)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
