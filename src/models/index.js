const sequelize = require("../config/db");
const User = require("./User");
const FeedRecord = require("./FeedRecord");
const MonitoringData = require("./MonitoringData");
const AuditLog = require("./AuditLog");

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

User.hasMany(AuditLog, {
  foreignKey: "userId",
  onDelete: "SET NULL"
});
AuditLog.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = {
  sequelize,
  User,
  FeedRecord,
  MonitoringData,
  AuditLog
};