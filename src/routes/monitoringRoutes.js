const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  createMonitoringValidator,
  monitoringIdValidator
} = require("../validators/monitoringValidators");
const {
  createMonitoringRecord,
  getAllMonitoringRecords,
  getMonitoringRecordById
} = require("../controllers/monitoringController");

router.use(authMiddleware);

router.post("/", createMonitoringValidator, validateMiddleware, createMonitoringRecord);
router.get("/", getAllMonitoringRecords);
router.get("/:id", monitoringIdValidator, validateMiddleware, getMonitoringRecordById);

module.exports = router;