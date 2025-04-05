import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
