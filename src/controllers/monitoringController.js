const { MonitoringData, FeedRecord } = require("../models");
const createAuditLog = require("../middleware/auditMiddleware");

exports.createMonitoringRecord = async (req, res, next) => {
  try {
    const {
      feedRecordId,
      larvaeGrowthRate,
      temperature,
      humidity,
      inputLog,
      outputLog,
      recordedAt
    } = req.body;

    const feedRecord = await FeedRecord.findByPk(feedRecordId);

    if (!feedRecord) {
      return res.status(404).json({
        success: false,
        message: "Associated feed record not found"
      });
    }

    if (req.user.role !== "admin" && feedRecord.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to add monitoring data to this feed record"
      });
    }

    const monitoring = await MonitoringData.create({
      feedRecordId,
      larvaeGrowthRate,
      temperature,
      humidity,
      inputLog,
      outputLog,
      recordedAt
    });

    await createAuditLog({
      userId: req.user.id,
      action: "CREATE",
      entity: "MonitoringData",
      entityId: monitoring.id,
      details: { feedRecordId, temperature, humidity }
    });

    return res.status(201).json({
      success: true,
      message: "Monitoring data created successfully",
      data: monitoring
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMonitoringRecords = async (req, res, next) => {
  try {
    const records = await MonitoringData.findAll({
      include: [
        {
          model: FeedRecord
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    const filteredRecords =
      req.user.role === "admin"
        ? records
        : records.filter((record) => record.FeedRecord && record.FeedRecord.userId === req.user.id);

    return res.status(200).json({
      success: true,
      message: "Monitoring data retrieved successfully",
      data: filteredRecords
    });
  } catch (error) {
    next(error);
  }
};

exports.getMonitoringRecordById = async (req, res, next) => {
  try {
    const record = await MonitoringData.findByPk(req.params.id, {
      include: [
        {
          model: FeedRecord
        }
      ]
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found"
      });
    }

    if (req.user.role !== "admin" && record.FeedRecord.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this monitoring record"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Monitoring record retrieved successfully",
      data: record
    });
  } catch (error) {
    next(error);
  }
};