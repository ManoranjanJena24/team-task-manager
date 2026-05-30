const AppError = require("../errors/AppError");

const { verifyAccessToken } = require("../common/utils/jwt");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "UNAUTHORIZED", "Access token missing");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    next(new AppError(401, "UNAUTHORIZED", "Invalid access token"));
  }
};

module.exports = authenticate;
