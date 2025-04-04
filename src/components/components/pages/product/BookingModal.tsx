import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  summary: string;
  price: number;
  startDate: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  tourName,
  summary,
  price,
  startDate,
}: BookingModalProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const serviceFee = 5;
  const cleaningFee = 3;
  const tax = price * 0.1;
  const totalCost = (price + serviceFee + cleaningFee + tax) * numberOfPeople;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Booking Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{tourName}</h2>
          <p className="text-muted-foreground">{summary}</p>
          <p className="text-muted-foreground">
            Start Date:{" "}
            {new Date(startDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div>
            <Label htmlFor="people">Number of People:</Label>
            <Select
              value={String(numberOfPeople)}
              onValueChange={(value) => setNumberOfPeople(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of people" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning Fee:</span>
              <span>${cleaningFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Cost:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Book Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
