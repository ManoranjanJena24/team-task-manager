const bcrypt = require("bcrypt");

const crypto = require("crypto");

const AppError = require("../../errors/AppError");

const authRepository = require("./auth.repository");
const { verifyRefreshToken } = require("../../common/utils/jwt");

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

const refreshTokens = async (refreshToken) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const storedToken = await authRepository.findRefreshTokenByHash(tokenHash);

  if (!storedToken) {
    throw new AppError(
      401,
      "INVALID_REFRESH_TOKEN",
      "Refresh token is invalid",
    );
  }

  if (storedToken.revokedAt) {
    throw new AppError(
      401,
      "INVALID_REFRESH_TOKEN",
      "Refresh token already revoked",
    );
  }

  if (storedToken.expiresAt < new Date()) {
    throw new AppError(401, "REFRESH_TOKEN_EXPIRED", "Refresh token expired");
  }

  const payload = verifyRefreshToken(refreshToken);

  await authRepository.revokeRefreshToken(storedToken.id);

  const newPayload = {
    userId: payload.userId,

    role: payload.role,

    organizationId: payload.organizationId,
  };

  const newAccessToken = generateAccessToken(newPayload);

  const newRefreshToken = generateRefreshToken(newPayload);

  const newHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  await authRepository.createRefreshToken({
    userId: payload.userId,

    tokenHash: newHash,

    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken: newAccessToken,

    refreshToken: newRefreshToken,
  };
};

module.exports = {
  login,
  refreshTokens,
};
