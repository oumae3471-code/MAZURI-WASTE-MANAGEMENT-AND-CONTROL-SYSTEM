const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'mazuri',
  process.env.MYSQL_USER || 'mazuri',
  process.env.MYSQL_PASSWORD || 'mazuri_pass',
  {
    host: process.env.MYSQL_HOST || 'mysql',
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
  }
);

module.exports = { sequelize, Sequelize };
