const { body, param } = require("express-validator");

exports.createMonitoringValidator = [
  body("feedRecordId")
    .isInt()
    .withMessage("feedRecordId must be a valid integer"),
  body("larvaeGrowthRate")
    .isFloat({ gt: 0 })
    .withMessage("Larvae growth rate must be greater than 0"),
  body("temperature")
    .isFloat()
    .withMessage("Temperature must be a valid number"),
  body("humidity")
    .isFloat()
    .withMessage("Humidity must be a valid number"),
  body("inputLog")
    .trim()
    .notEmpty()
    .withMessage("Input log is required"),
  body("outputLog")
    .trim()
    .notEmpty()
    .withMessage("Output log is required"),
  body("recordedAt")
    .isISO8601()
    .withMessage("RecordedAt must be a valid datetime")
];

exports.monitoringIdValidator = [
  param("id")
    .isInt()
    .withMessage("Monitoring ID must be a valid integer")
];