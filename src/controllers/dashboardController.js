const { User, FeedRecord, MonitoringData } = require("../models");
const { Sequelize } = require("sequelize");

exports.getDashboardMetrics = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalFarmers = await User.count({ where: { role: "farmer" } });
    const totalAdmins = await User.count({ where: { role: "admin" } });
    const totalFeedRecords = await FeedRecord.count();
    const totalMonitoringRecords = await MonitoringData.count();

    const totalQuantityProduced = await FeedRecord.sum("quantityProduced");

    return res.status(200).json({
      success: true,
      message: "Dashboard metrics retrieved successfully",
      data: {
        totalUsers,
        totalFarmers,
        totalAdmins,
        totalFeedRecords,
        totalMonitoringRecords,
        totalQuantityProduced: totalQuantityProduced || 0
      }
    });
  } catch (error) {
    next(error);
  }
};