require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,

  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },

  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },

  REDIS_URL: process.env.REDIS_URL,
};
