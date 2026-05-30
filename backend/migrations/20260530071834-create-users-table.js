"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,

        defaultValue: Sequelize.UUIDV4,

        primaryKey: true,
      },

      organization_id: {
        type: Sequelize.UUID,

        allowNull: true,

        references: {
          model: "organizations",

          key: "id",
        },

        onDelete: "SET NULL",
      },

      name: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,

        allowNull: false,

        unique: true,
      },

      password_hash: {
        type: Sequelize.TEXT,

        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM(
          "PLATFORM_ADMIN",
          "ORG_ADMIN",
          "MANAGER",
          "MEMBER",
        ),

        allowNull: false,
      },

      is_active: {
        type: Sequelize.BOOLEAN,

        defaultValue: true,
      },

      created_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
