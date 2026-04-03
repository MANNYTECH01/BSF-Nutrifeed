const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FeedRecord = sequelize.define(
  "FeedRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    feedType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantityProduced: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    inputMaterial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    outputFeed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["userId"]
      },
      {
        fields: ["productionDate"]
      },
      {
        fields: ["feedType"]
      }
    ]
  }
);

module.exports = FeedRecord;