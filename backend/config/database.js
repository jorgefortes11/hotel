// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hotel_management', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
