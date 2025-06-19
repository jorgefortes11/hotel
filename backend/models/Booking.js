const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending'
  },
  specialRequests: {
    type: DataTypes.TEXT
  }
});


Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: 'userId' });
  Booking.belongsTo(models.Room, { foreignKey: 'roomId' });
};

module.exports = Booking;