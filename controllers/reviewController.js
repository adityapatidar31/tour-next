const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = "679f0d3dd5561e3966786ab0";
  next();
};

exports.getReviewByUserAndTour = catchAsync(async (req, res, next) => {
  const { tourId: tour } = req.params;
  const { id: user } = req.user;
  const review = await Review.findOne({
    tour,
    user,
  });
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getReviewsByUserId = async (req, res, next) => {
  const { id } = req.user;
  const reviews = await Review.find({ user: id }).populate("tour");
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
