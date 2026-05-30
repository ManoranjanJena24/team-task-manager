const bcrypt = require("bcrypt");

const crypto = require("crypto");

const AppError = require("../../errors/AppError");

const repository = require("./user.repository");

const createUser = async (payload, currentUser) => {
  const existingUser = await repository.findUserByEmail(payload.email);

  if (existingUser) {
    throw new AppError(409, "USER_EXISTS", "User already exists");
  }

  const temporaryPassword = crypto.randomBytes(6).toString("hex");

  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const user = await repository.createUser({
    name: payload.name,

    email: payload.email,

    role: payload.role,

    passwordHash,

    isActive: true,

    organizationId: currentUser.organizationId,
  });

  return {
    user: {
      id: user.id,

      email: user.email,

      role: user.role,
    },

    temporaryPassword,
  };
};

const listUsers = async (currentUser) => {
  return repository.findUsersByOrganization(currentUser.organizationId);
};

module.exports = {
  createUser,
  listUsers,
};
