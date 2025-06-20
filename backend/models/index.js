const { sequelize } = require('../config/database');
const User = require('./User');
const Room = require('./Room');
const Booking = require('./Booking');

User.hasMany(Booking);
Booking.belongsTo(User);
Room.hasMany(Booking);
Booking.belongsTo(Room);

module.exports = {
  sequelize,
  User,
  Room,
  Booking
};
