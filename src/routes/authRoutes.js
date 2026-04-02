const express = require("express");
const router = express.Router();

const { register, login, profile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const { registerValidator, loginValidator } = require("../validators/authValidators");

router.post("/register", registerValidator, validateMiddleware, register);
router.post("/login", loginValidator, validateMiddleware, login);
router.get("/profile", authMiddleware, profile);

module.exports = router;