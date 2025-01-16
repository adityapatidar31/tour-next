const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.updateMe = catchAsync(async (req, res, next) => {
  //  1. Create error if user wants to update password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not used to update password updates. Please use '/updateMyPassword' route",
        400,
      ),
    );
  }
  //  2. Filler the undesired fields
  const { name, email } = req.body;

  //  3. Update User Document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true },
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

// Do not update password with it
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
