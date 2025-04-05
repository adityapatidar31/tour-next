import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { getOrderById } from "@/services/backend";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../Error";

import { Badge } from "@/components/ui/badge";
import BookingModalLoading from "./BookingModalLoading";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BookingModal({
  open,
  onClose,
  orderId,
}: BookingModalProps) {
  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => await getOrderById(orderId),
    enabled: !!orderId,
  });

  if (isLoading) {
    return <BookingModalLoading open={open} onClose={onClose} />;
  }

  if (isError || !booking) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <ErrorComponent message="Failed to load booking details" />
        </DialogContent>
      </Dialog>
    );
  }

  const tour = booking.tour;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Here are the complete details of your booking.
        </DialogDescription>
        {/* Tour Info */}
        <img
          src={`/img/${tour.imageCover}`}
          alt={tour.summary}
          className="w-full rounded-md h-40 object-cover"
        />
        <div className="pt-2 border-t space-y-2">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Order ID:</span>{" "}
              {booking.razorpayOrderId}
            </div>
            <div>
              <span className="font-medium">Start Date:</span>{" "}
              {formatDate(booking.startDate)}
            </div>
            <div>
              <span className="font-medium">Booking Created:</span>{" "}
              {formatDate(booking.createdAt)}
            </div>
            <div>
              <span className="font-medium">Payment:</span> ${booking.payment}
            </div>
            <div>
              <span className="font-medium">People:</span> {booking.people}
            </div>
            <div>
              <span className="font-medium">Tour Name:</span> {booking.tourName}
            </div>

            <div>
              <span className="font-medium">Summary:</span> {tour.summary}
            </div>

            <div className="flex flex-wrap gap-2 text-xs mt-2">
              <Badge className="p-2">Category: {tour.category}</Badge>
              <Badge>Difficulty: {tour.difficulty}</Badge>
              <Badge>Max Group Size: {tour.maxGroupSize}</Badge>
              <Badge>
                Rating: {tour.ratingsAverage}⭐ ({tour.ratingsQuantity})
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
