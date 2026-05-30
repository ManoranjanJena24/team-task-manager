const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const ROLES = require("../../common/enums/roles");


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    organizationId: {
      type: DataTypes.UUID,

      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,

      allowNull: false,

      unique: true,

      validate: {
        isEmail: true,
      },
    },

    passwordHash: {
      type: DataTypes.TEXT,

      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        ROLES.PLATFORM_ADMIN,
        ROLES.ORG_ADMIN,
        ROLES.MANAGER,
        ROLES.MEMBER,
      ),

      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login_at",
    },
  },
  {
    tableName: "users",

    timestamps: true,

    underscored: true,
  },
);

module.exports = User;
