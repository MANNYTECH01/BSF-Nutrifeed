const { body, param } = require("express-validator");

exports.createFeedValidator = [
  body("feedType")
    .trim()
    .notEmpty()
    .withMessage("Feed type is required"),
  body("quantityProduced")
    .isFloat({ gt: 0 })
    .withMessage("Quantity produced must be a number greater than 0"),
  body("productionDate")
    .isDate()
    .withMessage("Production date must be a valid date"),
  body("inputMaterial")
    .trim()
    .notEmpty()
    .withMessage("Input material is required"),
  body("outputFeed")
    .trim()
    .notEmpty()
    .withMessage("Output feed is required")
];

exports.feedIdValidator = [
  param("id")
    .isInt()
    .withMessage("Feed record ID must be a valid integer")
];