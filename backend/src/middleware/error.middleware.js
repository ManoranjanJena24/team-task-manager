module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;

  const code = error.code || "INTERNAL_SERVER_ERROR";

  return res.status(status).json({
    status,
    code,
    message: error.message || "Something went wrong",
  });
};
