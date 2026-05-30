const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    organizationId: {
      type: DataTypes.UUID,

      allowNull: false,

      field: "organization_id",
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,
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
    tableName: "projects",

    timestamps: true,

    underscored: true,
  },
);

module.exports = Project;
