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

module.exports = {
  login,
};
