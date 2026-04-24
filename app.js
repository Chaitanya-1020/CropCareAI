const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const cropRouter = require("./routes/predictionRoute");
const UserlocationRouter = require("./routes/userLocationRoute");
const chatRouter = require("./routes/chatRoute");
const AppError = require("./utils/appErrors");

const app = express();
const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/crops", cropRouter);
app.use("/api/v1/location", UserlocationRouter);
app.use("/api/v1/ai", chatRouter);
app.get("/", (req, res) => {
    res.send("CropCare AI Backend Server is Running");
});
app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
