/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
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
import axios from "axios";
import { BASE_URL, cookieSender, createOrder } from "@/services/backend";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  summary: string;
  price: number;
  startDate: string;
  tourId: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  tourName,
  summary,
  price,
  startDate,
  tourId,
}: BookingModalProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const navigate = useNavigate();
  const serviceFee = 300;
  const cleaningFee = 500;
  const tax = price * numberOfPeople * 0.18;
  const totalCost = price * numberOfPeople + serviceFee + cleaningFee + tax;

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handlePayment = async () => {
    try {
      const { data: order } = await createOrder(
        tourId,
        numberOfPeople,
        startDate
      );

      if (!order.data || !order.data.id) {
        throw new Error("Invalid order response");
      }

      const options = {
        key: "rzp_test_8J33nqpOV0NR4x", // Replace with your live key if needed
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Tour-Next",
        description: "Tour Booking Payment",
        order_id: order.data.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}api/v1/orders/verifyPayment`,
              {
                ...response,
                tourId,
                numberOfPeople,
              },
              cookieSender
            );

            if (verifyRes.data.status) {
              toast.success("🎉 Payment Successful!");
              navigate("/home/bookings");
              onClose();
            } else {
              toast.error("❌ Payment Verification Failed!");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("❌ Payment Verification Failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6D28D9" },
      };

      const rzp = new (window as any).Razorpay(options);
      onClose();
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("❌ Payment failed!");
    }
  };

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
            {new Date(startDate).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div>
            <Label htmlFor="people">Number of People:</Label>
            <div className="pt-1">
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
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>₹{(price * numberOfPeople).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span>₹{serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning Fee:</span>
              <span>₹{cleaningFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Cost:</span>
              <span>₹{totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>Book Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
