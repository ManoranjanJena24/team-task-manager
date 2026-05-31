const User = require("../../database/models/user.model");

const RefreshToken = require("../../database/models/refresh-token.model");

const findUserByEmail = (email) => {
  return User.findOne({
    where: { email },
  });
};

const findUserById = (userId) => {
  return User.findByPk(userId);
};

const createRefreshToken = (data) => {
  return RefreshToken.create(data);
};

const updateLastLogin = (userId) => {
  return User.update(
    {
      lastLoginAt: new Date(),
    },
    {
      where: {
        id: userId,
      },
    },
  );
};

const findRefreshTokenByHash = async (tokenHash) => {
  return RefreshToken.findOne({
    where: {
      tokenHash,
    },
  });
};

const revokeRefreshToken = async (id) => {
  return RefreshToken.update(
    {
      revokedAt: new Date(),
    },
    {
      where: { id },
    },
  );
};

module.exports = {
  findUserByEmail,
  findUserById,
  createRefreshToken,
  updateLastLogin,
  findRefreshTokenByHash,
  revokeRefreshToken,
};
