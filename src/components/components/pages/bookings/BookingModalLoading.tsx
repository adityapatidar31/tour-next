import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BookingModalLoadingProps {
  open: boolean;
  onClose: () => void;
}

function BookingModalLoading({ open, onClose }: BookingModalLoadingProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" /> {/* Title Skeleton */}
          <Skeleton className="h-4 w-full" /> {/* Description Skeleton */}
        </div>
        <Skeleton className="h-40 w-full rounded-xl" /> {/* Image Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModalLoading;
