const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = require("../utils/multer");

const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.use(authController.protect);

// Protect all the below routes

router.post("/logout", authController.logoutUser);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

router.get("/isLogedIn", authController.isLoggedIn, userController.sendUser);

router.patch("/updateMe", userController.updateMe);

router.delete("/deleteMe", userController.deleteMe);

router.route("/me").get(userController.getMe, userController.getUser);

router.patch("/updateMyPassword", authController.updatePassword);

router.patch(
  "/profile-photo",
  upload.single("image"),
  userController.uploadMyProfilePhoto,
);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
