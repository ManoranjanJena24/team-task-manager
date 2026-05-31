"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUser = await queryInterface.sequelize.query(
      `
        SELECT id
        FROM users
        WHERE email = 'admin@tasktracker.com'
        LIMIT 1
        `,
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (existingUser.length) {
      console.log("Platform admin already exists. Skipping seed.");

      return;
    }

    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: crypto.randomUUID(),

        organization_id: null,

        name: "Platform Admin",

        email: "admin@tasktracker.com",

        password_hash: passwordHash,

        role: "PLATFORM_ADMIN",

        is_active: true,

        created_at: new Date(),

        updated_at: new Date(),
      },
    ]);

    console.log("Platform admin seeded successfully.");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      email: "admin@tasktracker.com",
    });
  },
};
