const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoute");
const cropRouter = require("./routes/predictionRoute");
const UserlocationRouter = require("./routes/userLocationRoute");
const chatRouter = require("./routes/chatRoute");
const AppError = require("./utils/appErrors");

const app = express();

// ================= MIDDLEWARE =================

// Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Cookies
app.use(cookieParser());

// ✅ FIXED CORS (works for both local + deployed frontend)
app.use(cors({
  origin: "*",   // allow all (simple & works everywhere)
  credentials: true
}));

// ================= ROUTES =================

app.use("/api/v1/users", userRouter);
app.use("/api/v1/crops", cropRouter);
app.use("/api/v1/location", UserlocationRouter);
app.use("/api/v1/ai", chatRouter);

// Root route (test)
app.get("/", (req, res) => {
  res.send("CropCare AI Backend Server is Running");
});

// ================= ERROR HANDLING =================

// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} URL`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;