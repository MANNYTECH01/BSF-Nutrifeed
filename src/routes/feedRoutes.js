const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const { createFeedValidator, feedIdValidator } = require("../validators/feedValidators");
const {
  createFeedRecord,
  getAllFeedRecords,
  getFeedRecordById,
  updateFeedRecord,
  deleteFeedRecord,
  getFeedStats
} = require("../controllers/feedController");

router.use(authMiddleware);

router.get("/stats", getFeedStats);
router.post("/", createFeedValidator, validateMiddleware, createFeedRecord);
router.get("/", getAllFeedRecords);
router.get("/:id", feedIdValidator, validateMiddleware, getFeedRecordById);
router.put("/:id", feedIdValidator, validateMiddleware, updateFeedRecord);
router.delete("/:id", feedIdValidator, validateMiddleware, deleteFeedRecord);

module.exports = router;