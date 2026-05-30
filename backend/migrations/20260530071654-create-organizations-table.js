// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("organizations", {
      id: {
        type: Sequelize.UUID,

        defaultValue: Sequelize.UUIDV4,

        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,

        allowNull: false,

        unique: true,
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
    await queryInterface.dropTable("organizations");
  },
};