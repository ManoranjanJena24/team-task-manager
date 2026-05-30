const app = require("./app");
const env = require("./config/env");

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
