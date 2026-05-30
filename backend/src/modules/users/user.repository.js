const User = require("../../database/models/user.model");

const createUser = (payload) => {
  return User.create(payload);
};

const findUserByEmail = (email) => {
  return User.findOne({
    where: { email },
  });
};

const findUsersByOrganization = (organizationId) => {
  return User.findAll({
    where: {
      organizationId,
    },
  });
};

const findUserById = (userId) => {
  return User.findByPk(userId);
};

const deactivateUser = (userId) => {
  return User.update(
    {
      isActive: false,
    },
    {
      where: {
        id: userId,
      },
    },
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUsersByOrganization,
  findUserById,
  deactivateUser,
};
