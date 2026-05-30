"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "created_by", {
      type: Sequelize.UUID,

      allowNull: false,

      references: {
        model: "users",

        key: "id",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("tasks", "created_by");
  },
};
