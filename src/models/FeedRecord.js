const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FeedRecord = sequelize.define('FeedRecord', {
    batchId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wasteWeight: {
        type: DataTypes.FLOAT, // In Kilograms
        allowNull: false
    },
    larvaeWeight: {
        type: DataTypes.FLOAT, // In Kilograms
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT // In Celsius
    },
    status: {
        type: DataTypes.ENUM('Processing', 'Refining', 'Completed'),
        defaultValue: 'Processing'
    }
});

module.exports = FeedRecord;