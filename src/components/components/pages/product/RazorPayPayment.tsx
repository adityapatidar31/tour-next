/* eslint-disable @typescript-eslint/no-explicit-any */
import { createOrder } from "@/services/backend";
import axios from "axios";
import { useEffect } from "react";

interface RazorpayPaymentProps {
  tourId: string;
  numberOfPeople: number;
  startDate: string;
}

const RazorpayPayment = ({
  tourId,
  numberOfPeople,
  startDate,
}: RazorpayPaymentProps) => {
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
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
        key: "rzp_test_8J33nqpOV0NR4x",
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Tour-Next",
        description: "Tour Booking Payment",
        order_id: order.data.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/v1/razorpay/verify-payment",
              {
                ...response,
                tourId,
                numberOfPeople,
              }
            );

            if (verifyRes.data.success) {
              alert("Payment Successful!");
            } else {
              alert("Payment Verification Failed!");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6D28D9" }, // Matching Tour-Next theme color
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-violet-600 text-white px-4 py-2 rounded-md"
    >
      Pay Now
    </button>
  );
};

export default RazorpayPayment;
