const express = require("express");

const router = express.Router();

const controller = require("./project.controller");

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/rbac.middleware");

const validate = require("../../middleware/validation.middleware");

const { createProjectSchema } = require("./project.validation");

router.post(
  "/",

  authenticate,

  authorize("ORG_ADMIN", "MANAGER"),

  validate(createProjectSchema),

  controller.createProject,
);

router.get(
  "/",

  authenticate,

  authorize("ORG_ADMIN", "MANAGER"),

  controller.getProjects,
);

module.exports = router;
