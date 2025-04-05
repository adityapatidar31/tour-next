const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(orderController.getAllOrdersUser)
  .post(orderController.createOrder);

router.route("/verifyPayment").post(orderController.verifyPayment);

module.exports = router;
