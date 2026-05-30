require("./associations");

const sequelize = require("../config/database");

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);

    process.exit(1);
  }
};

module.exports = connectDB;
