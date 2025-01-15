const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const factor = require("./handlerFactory");

exports.getAllReviews = catchAsync(async (req, res) => {
  const filter = {};
  const { tourId } = req.params;
  if (tourId) {
    filter.tour = tourId;
  }

  const reviews = await Review.find(filter);
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

exports.deleteReview = factor.deleteOne(Review);
