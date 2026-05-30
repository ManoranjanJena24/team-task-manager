const AppError = require("../errors/AppError");

const User = require("../database/models/user.model");

const validateUserBelongsToOrganization = async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new AppError(404, "USER_NOT_FOUND", "User not found"));
  }

  if (user.organizationId !== req.user.organizationId) {
    return next(new AppError(403, "FORBIDDEN", "Access denied"));
  }

  req.targetUser = user;

  next();
};

module.exports = {
  validateUserBelongsToOrganization,
};
