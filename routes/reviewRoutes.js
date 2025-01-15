const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
// POST /tour/:tourId/reviews
// POST /reviews

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview,
  );

router
  .route("/:id")
  .delete(authController.restrictTo("admin"), reviewController.deleteReview);

module.exports = router;
