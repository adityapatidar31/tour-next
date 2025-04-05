import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getOrderById } from "@/services/backend";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../Error";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

export default function BookingModal({
  open,
  onClose,
  orderId,
}: BookingModalProps) {
  const {
    data: singleBooking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      return await getOrderById(orderId);
    },
  });
  console.log(singleBooking);
  if (isError)
    return (
      <ErrorComponent message="Failed to Single Booking. Try again later" />
    );
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          You clicked booking with Order ID:{" "}
          <span className="font-medium">{orderId}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
