const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,

      unique: true,

      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "organizations",

    timestamps: true,

    underscored: true,
  },
);

module.exports = Organization;
