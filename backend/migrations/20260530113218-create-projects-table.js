"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.UUID,

        defaultValue: Sequelize.UUIDV4,

        primaryKey: true,
      },

      organization_id: {
        type: Sequelize.UUID,

        allowNull: false,

        references: {
          model: "organizations",

          key: "id",
        },

        onDelete: "CASCADE",
      },

      name: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("projects");
  },
};
