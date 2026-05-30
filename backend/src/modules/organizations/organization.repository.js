const sequelize = require("../../config/database");

const Organization = require("../../database/models/organization.model");

const User = require("../../database/models/user.model");

const createOrganization = async (organizationData, transaction) => {
  return Organization.create(organizationData, { transaction });
};

const createUser = async (userData, transaction) => {
  return User.create(userData, { transaction });
};

const findOrganizationByName = async (name) => {
  return Organization.findOne({
    where: {
      name,
    },
  });
};

const findUserByEmail = async (email) => {
  return User.findOne({
    where: {
      email,
    },
  });
};

module.exports = {
  sequelize,

  createOrganization,

  createUser,

  findOrganizationByName,

  findUserByEmail,
};
