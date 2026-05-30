const app = require("./app");

const env = require("./config/env");

const connectDB = require("./database");

const { connectRedis } = require("./config/redis");

const startServer = async () => {
  try {
    await connectDB();

    await connectRedis();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
