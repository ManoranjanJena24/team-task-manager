const bcrypt = require("bcrypt");

const crypto = require("crypto");

const AppError = require("../../errors/AppError");

const authRepository = require("./auth.repository");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../common/utils/jwt");

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const payload = {
    userId: user.id,

    role: user.role,

    organizationId: user.organizationId,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await authRepository.createRefreshToken({
    userId: user.id,

    tokenHash,

    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await authRepository.updateLastLogin(user.id);

  return {
    accessToken,
    refreshToken,

    user: {
      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,
    },
  };
};

module.exports = {
  login,
};
