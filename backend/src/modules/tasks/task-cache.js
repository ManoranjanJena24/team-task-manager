const buildTaskCacheKey = ({ userId, status, priority, page, limit }) => {
  return [
    "tasks",
    userId,
    status || "all",
    priority || "all",
    page || 1,
    limit || 10,
  ].join(":");
};

module.exports = {
  buildTaskCacheKey,
};
