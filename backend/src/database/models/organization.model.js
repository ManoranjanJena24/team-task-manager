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
  },
  {
    tableName: "organizations",

    timestamps: true,

    underscored: true,
  },
);

module.exports = Organization;
