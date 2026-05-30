const { client } = require("../../config/redis");

const invalidateTaskCache = async (userId) => {
  const keys = await client.keys(`tasks:${userId}:*`);

  if (keys.length) {
    await client.del(keys);
  }
};

module.exports = {
  invalidateTaskCache,
};
