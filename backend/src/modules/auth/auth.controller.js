const authService = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      status: 200,

      message: "Login successful",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const refreshToken = async (req, res, next) => {
  try {
    const result = await authService.refreshTokens(req.body.refreshToken);

    return res.status(200).json({
      status: 200,

      message: "Token refreshed successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  refreshToken,
};
