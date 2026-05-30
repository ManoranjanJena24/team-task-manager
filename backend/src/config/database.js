const { Sequelize } = require("sequelize");
const env = require("./env");

const sequelize = new Sequelize(env.DB.NAME, env.DB.USER, env.DB.PASSWORD, {
  host: env.DB.HOST,
  port: env.DB.PORT,
  dialect: "postgres",

  logging: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
