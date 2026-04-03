const { FeedRecord, User, MonitoringData } = require("../models");
const { Op } = require("sequelize");
const createAuditLog = require("../middleware/auditMiddleware");

exports.createFeedRecord = async (req, res, next) => {
  try {
    const { feedType, quantityProduced, productionDate, inputMaterial, outputFeed, notes } = req.body;

    const feedRecord = await FeedRecord.create({
      userId: req.user.id,
      feedType,
      quantityProduced,
      productionDate,
      inputMaterial,
      outputFeed,
      notes
    });

    await createAuditLog({
      userId: req.user.id,
      action: "CREATE",
      entity: "FeedRecord",
      entityId: feedRecord.id,
      details: { feedType, quantityProduced }
    });

    return res.status(201).json({
      success: true,
      message: "Feed record created successfully",
      data: feedRecord
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedRecords = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const { feedType, startDate, endDate } = req.query;

    const whereClause = req.user.role === "admin" ? {} : { userId: req.user.id };

    if (feedType) {
      whereClause.feedType = { [Op.iLike]: `%${feedType}%` };
    }

    if (startDate && endDate) {
      whereClause.productionDate = {
        [Op.between]: [startDate, endDate]
      };
    }

    const { count, rows } = await FeedRecord.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });

    return res.status(200).json({
      success: true,
      message: "Feed records retrieved successfully",
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeedRecordById = async (req, res, next) => {
  try {
    const record = await FeedRecord.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"]
        },
        {
          model: MonitoringData
        }
      ]
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Feed record not found"
      });
    }

    if (req.user.role !== "admin" && record.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this record"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feed record retrieved successfully",
      data: record
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFeedRecord = async (req, res, next) => {
  try {
    const record = await FeedRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Feed record not found"
      });
    }

    if (req.user.role !== "admin" && record.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this record"
      });
    }

    await record.update(req.body);

    await createAuditLog({
      userId: req.user.id,
      action: "UPDATE",
      entity: "FeedRecord",
      entityId: record.id,
      details: req.body
    });

    return res.status(200).json({
      success: true,
      message: "Feed record updated successfully",
      data: record
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedRecord = async (req, res, next) => {
  try {
    const record = await FeedRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Feed record not found"
      });
    }

    if (req.user.role !== "admin" && record.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this record"
      });
    }

    await createAuditLog({
      userId: req.user.id,
      action: "DELETE",
      entity: "FeedRecord",
      entityId: record.id,
      details: { feedType: record.feedType }
    });

    await record.destroy();

    return res.status(200).json({
      success: true,
      message: "Feed record deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeedStats = async (req, res, next) => {
  try {
    const whereClause = req.user.role === "admin" ? {} : { userId: req.user.id };

    const totalRecords = await FeedRecord.count({ where: whereClause });
    const totalQuantityProduced = await FeedRecord.sum("quantityProduced", { where: whereClause });

    return res.status(200).json({
      success: true,
      message: "Feed statistics retrieved successfully",
      data: {
        totalRecords,
        totalQuantityProduced: totalQuantityProduced || 0
      }
    });
  } catch (error) {
    next(error);
  }
};