const { User, AuditLog } = require("../models");

exports.getAllUsersAnonymized = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "role", "createdAt"]
    });

    return res.status(200).json({
      success: true,
      message: "Anonymized users retrieved successfully",
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 50
    });

    return res.status(200).json({
      success: true,
      message: "Audit logs retrieved successfully",
      data: logs
    });
  } catch (error) {
    next(error);
  }
};