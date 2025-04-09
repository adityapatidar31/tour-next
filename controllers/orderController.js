const RazorPay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tour = require("../models/tourModel");

const razorpay = new RazorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.getAllOrdersUser = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  // const userId = "5c8a1f4e2f8fb814b56fa185";

  const orders = await Order.find({ user: userId, paymentStatus: "confirmed" });

  return res.status(200).json({
    status: "success",
    data: orders,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Order Id is required", 401));
  }

  const order = await Order.findById(id).populate(
    "tour",
    "imageCover summary ratingsAverage ratingsQuantity category difficulty maxGroupSize duration",
  );

  if (!order) {
    return next(
      new AppError("Invalid Order Id. Please provide the correct Id", 401),
    );
  }

  return res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { tourId, people, startDate } = req.body;

  const { id: userId } = req.user;

  // const userId = "5c8a1f4e2f8fb814b56fa185";

  if (!tourId) {
    return next(new AppError("Tour Id is required.", 401));
  }

  if (!people || !startDate) {
    return next(new AppError("People and Start Date are required.", 400));
  }

  const tour = await Tour.findById(tourId);
  if (!tour) {
    return next(new AppError("Please provide a valid tourId", 401));
  }

  const serviceCharge = 300;
  const cleaningCharge = 500;
  const tax = tour.price * Number(people) * 0.18;

  const totalPrice = Math.round(
    tour.price * people + serviceCharge + cleaningCharge + tax,
  );

  const options = {
    amount: totalPrice * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  const orderData = {
    razorpayOrderId: order.id,
    startDate,
    payment: order.amount / 100,
    people,
    user: userId,
    tour: tourId,
    tourName: tour.name,
  };

  await Order.create(orderData);

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    return next(new AppError("Payment verification failed.", 400));
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { razorpayOrderId },
    {
      paymentStatus: "confirmed",
    },
    { new: true },
  );
  if (!updatedOrder) {
    return next(new AppError("Order not found.", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Payment verified and order confirmed",
  });
});
