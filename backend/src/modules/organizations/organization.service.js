const bcrypt = require("bcrypt");

const crypto = require("crypto");

const AppError = require("../../errors/AppError");

const roles = require("../../common/constants/roles");

const repository = require("./organization.repository");

const createOrganization = async (payload) => {
  const {
    organizationName,

    description,

    adminName,

    adminEmail,
  } = payload;

  const existingOrg = await repository.findOrganizationByName(organizationName);

  if (existingOrg) {
    throw new AppError(
      409,
      "ORGANIZATION_EXISTS",
      "Organization already exists",
    );
  }

  const existingUser = await repository.findUserByEmail(adminEmail);

  if (existingUser) {
    throw new AppError(409, "USER_EXISTS", "User already exists");
  }

  const transaction = await repository.sequelize.transaction();

  try {
    const organization = await repository.createOrganization(
      {
        name: organizationName,

        description,
      },
      transaction,
    );

    const temporaryPassword = crypto.randomBytes(6).toString("hex");

    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    const orgAdmin = await repository.createUser(
      {
        organizationId: organization.id,

        name: adminName,

        email: adminEmail,

        passwordHash,

        role: roles.ORG_ADMIN,

        isActive: true,
      },
      transaction,
    );

    await transaction.commit();

    return {
      organization,

      orgAdmin: {
        id: orgAdmin.id,

        email: orgAdmin.email,
      },

      temporaryPassword,
    };
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
};

module.exports = {
  createOrganization,
};
