const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/rbac.middleware");

const validate = require("../../middleware/validation.middleware");

const controller = require("./organization.controller");

const { createOrganizationSchema } = require("./organization.validation");

router.post(
  "/",

  authenticate,

  authorize("PLATFORM_ADMIN"),

  validate(createOrganizationSchema),

  controller.createOrganization,
);

module.exports = router;
