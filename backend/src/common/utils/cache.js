const { client } = require("../../config/redis");

const getCache = async (key) => {
  const value = await client.get(key);

  return value ? JSON.parse(value) : null;
};

const setCache = async (key, value, ttl = 300) => {
  await client.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};

const deleteCache = async (key) => {
  await client.del(key);
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
