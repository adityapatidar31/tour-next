import { getAllBookingUser } from "@/services/backend";
import { useAppSelector } from "@/services/hooks";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../Error";
import BookingList from "./BookingList";

function BookingPage() {
  // const { _id: userId } = useAppSelector((store) => store.user);
  // const navigate = useNavigate();

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      // if (!userId) {
      //   navigate("/login");
      //   return [];
      // }
      return await getAllBookingUser();
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  console.log(bookings);
  if (isError) {
    return <ErrorComponent message="Failed to load Booking, try again later" />;
  }
  if (!bookings) return;
  return <BookingList bookings={bookings} onRowClick={() => {}} />;
}

export default BookingPage;
