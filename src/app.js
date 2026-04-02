const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes");
const monitoringRoutes = require("./routes/monitoringRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later."
  }
});
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BSF-Nutrifeed Backend API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

module.exports = app;