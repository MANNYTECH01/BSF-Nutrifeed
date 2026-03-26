require('dotenv').config(); // THIS MUST BE FIRST
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;