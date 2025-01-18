const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

express.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// Severing the static file
app.use(express.static(path.join(__dirname, "public")));

// 1) MIDDLEWARES

// set Security HTTP headers
app.use(helmet());

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Development Logs
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  }),
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter Pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "maxGroupSize",
      "ratingsQuantity",
      "difficulty",
      "price",
    ],
  }),
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
// 4) Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
