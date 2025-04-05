const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(orderController.getAllOrdersUser)
  .post(orderController.createOrder);

router.route("/:id").get(orderController.getOrderById);

router.route("/verifyPayment").post(orderController.verifyPayment);

module.exports = router;
