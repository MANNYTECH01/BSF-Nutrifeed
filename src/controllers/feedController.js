const { FeedRecord, User } = require("../models");

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
    const whereClause = req.user.role === "admin" ? {} : { userId: req.user.id };

    const records = await FeedRecord.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      message: "Feed records retrieved successfully",
      data: records
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

    await record.destroy();

    return res.status(200).json({
      success: true,
      message: "Feed record deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};