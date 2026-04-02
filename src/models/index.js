const sequelize = require("../config/db");
const User = require("./User");
const FeedRecord = require("./FeedRecord");
const MonitoringData = require("./MonitoringData");

User.hasMany(FeedRecord, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
FeedRecord.belongsTo(User, {
  foreignKey: "userId"
});

FeedRecord.hasMany(MonitoringData, {
  foreignKey: "feedRecordId",
  onDelete: "CASCADE"
});
MonitoringData.belongsTo(FeedRecord, {
  foreignKey: "feedRecordId"
});

module.exports = {
  sequelize,
  User,
  FeedRecord,
  MonitoringData
};