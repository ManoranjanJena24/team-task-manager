const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,

      allowNull: false,
    },

    tokenHash: {
      type: DataTypes.TEXT,

      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,

      allowNull: false,
    },

    revokedAt: {
      type: DataTypes.DATE,

      allowNull: true,
    },
  },
  {
    tableName: "refresh_tokens",

    timestamps: true,

    underscored: true,
  },
);

module.exports = RefreshToken;
