const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getAllUsersAnonymized, getAuditLogs } = require("../controllers/adminController");

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/users-anonymized", getAllUsersAnonymized);
router.get("/audit-logs", getAuditLogs);

module.exports = router;