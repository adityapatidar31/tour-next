const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const tour = await Model.findByIdAndDelete(req.params.id);

    if (!tour) {
      return next(new AppError("No doc found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();

    // Apply First
    if (req.query.search) {
      const searchValue = req.query.search;
      query = query.find({ $text: { $search: searchValue } });
    }

    // Apply filtering, sorting, limiting, and pagination
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // 🔥 Debugging
    // console.log("Final MongoDB Query:", features.query.getFilter());

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: doc.length,
      data: {
        doc,
      },
    });
  });
