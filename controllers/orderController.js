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

exports.createOrder = catchAsync(async (req, res, next) => {
  const { tourId, people, startDate } = req.body;
  const userId = "5c8a1d5b0190b214360dc057";

  if (!tourId) {
    return next(new AppError("Tour Id is required.", 401));
  }

  if (!people || !startDate) {
    return next(new AppError("People and Start Date are required.", 400));
  }

  const tour = await Tour.findById(tourId);

  if (!tour) {
    return next(new AppError("Please Provide the valid tourId", 401));
  }
  const serviceCharge = 3;
  const cleaningCharge = 5;
  const tax = tour.price * Number(people) * 0.1;
  const totalPrice =
    Math.round(
      (tour.price * people + serviceCharge + cleaningCharge + tax) * 100,
    ) / 100;

  const options = {
    amount: totalPrice * 100,
    currency: "USD",
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
  };

  await Order.create(orderData);

  res.status(200).json({
    status: "success",
    data: order,
  });
});
