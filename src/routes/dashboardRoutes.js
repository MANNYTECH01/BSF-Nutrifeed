const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getDashboardMetrics } = require("../controllers/dashboardController");

router.get("/metrics", authMiddleware, roleMiddleware("admin"), getDashboardMetrics);

module.exports = router;