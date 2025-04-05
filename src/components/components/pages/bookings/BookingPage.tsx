import { getAllBookingUser } from "@/services/backend";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorComponent from "../../Error";
import BookingList from "./BookingList";
import BookingListLoading from "./BookingLoading";
import BookingModal from "./BookingModal";
import { Booking } from "@/services/types";

function BookingPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookingUser,
  });

  if (isLoading) return <BookingListLoading />;
  if (isError)
    return <ErrorComponent message="Failed to load Booking. Try again later" />;
  if (!bookings) return null;

  return (
    <>
      <BookingList bookings={bookings} onRowClick={setSelectedBooking} />
      {selectedBooking && (
        <BookingModal
          open={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          orderId={selectedBooking.razorpayOrderId}
        />
      )}
    </>
  );
}

export default BookingPage;
