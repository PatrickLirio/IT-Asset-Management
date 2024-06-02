const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assetNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  baselineItem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assigneePosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lanMacAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wifiMacAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  printerIpAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Asset;
