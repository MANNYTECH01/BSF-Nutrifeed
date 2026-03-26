const FeedRecord = require('../models/FeedRecord');

// Create a new production log
exports.createRecord = async (req, res) => {
    try {
        const { batchId, wasteWeight, larvaeWeight, temperature, status } = req.body;

        const newRecord = await FeedRecord.create({
            batchId,
            wasteWeight,
            larvaeWeight,
            temperature,
            status
        });

        res.status(201).json({ message: "Production record logged successfully", data: newRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all production records
exports.getAllRecords = async (req, res) => {
    try {
        const records = await FeedRecord.findAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};