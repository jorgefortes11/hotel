const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.ENUM('single', 'double', 'suite', 'deluxe'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Room;
