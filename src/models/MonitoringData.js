const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MonitoringData = sequelize.define(
  "MonitoringData",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    larvaeGrowthRate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    inputLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    outputLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recordedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["feedRecordId"]
      },
      {
        fields: ["recordedAt"]
      }
    ]
  }
);

module.exports = MonitoringData;