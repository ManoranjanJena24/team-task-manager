const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (error) => {
  console.error("Redis Error:", error);
});

const connectRedis = async () => {
  await client.connect();

  console.log("Redis Connected Successfully");
};

module.exports = {
  client,
  connectRedis,
};
