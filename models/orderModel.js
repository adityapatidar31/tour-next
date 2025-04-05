const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      required: [true, "Order must have a Razorpay order ID"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    payment: {
      type: Number,
      required: [true, "Payment amount is required"],
    },
    people: {
      type: Number,
      required: [true, "Number of people is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    tourName: {
      type: String,
      require: [true, "tour name is required"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Order must belong to a tour"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
