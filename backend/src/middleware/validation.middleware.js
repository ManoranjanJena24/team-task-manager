const AppError = require("../errors/AppError");

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next(
      new AppError(400, "VALIDATION_ERROR", result.error.errors[0].message),
    );
  }

  req.body = result.data;

  next();
};

module.exports = validate;
