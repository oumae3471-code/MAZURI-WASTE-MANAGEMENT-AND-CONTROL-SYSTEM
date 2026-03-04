const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const WasteCollection = sequelize.define('WasteCollection', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  source: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  weightKg: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  collectedAt: { type: DataTypes.DATE, allowNull: false },
}, { tableName: 'WasteCollections' });

module.exports = WasteCollection;
