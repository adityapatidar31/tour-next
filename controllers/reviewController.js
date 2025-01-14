const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res) => {
  const { tourId: tour } = req.params;

  const reviews = await Review.find({ tour });
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const { review, rating } = req.body;
  let { user, tour } = req.body;
  if (!tour) {
    tour = req.params.tourId;
  }
  if (!user) {
    user = req.user.id;
  }
  const newReview = await Review.create({
    review,
    rating,
    user,
    tour,
  });

  res.status(201).json({
    status: "success",
    review: newReview,
  });
});
