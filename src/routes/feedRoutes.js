const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const { protect } = require('../middleware/auth');

// Only authenticated users can log or view data
router.post('/log', protect, feedController.createRecord);
router.get('/all', protect, feedController.getAllRecords);

module.exports = router;