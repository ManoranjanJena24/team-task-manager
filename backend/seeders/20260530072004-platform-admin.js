"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: require("crypto").randomUUID(),

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
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      email: "admin@tasktracker.com",
    });
  },
};
