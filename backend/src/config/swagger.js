const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Team Task Tracker API",

      version: "1.0.0",

      description:
        "Multi-tenant task management system with RBAC, JWT authentication, refresh token rotation, Redis caching, and Docker deployment.",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.swagger.js"],
};

module.exports = swaggerJsDoc(options);
