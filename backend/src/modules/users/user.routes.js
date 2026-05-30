const express = require("express");

const router = express.Router();

const controller = require("./user.controller");

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/rbac.middleware");

const validate = require("../../middleware/validation.middleware");

const { createUserSchema } = require("./user.validation");

router.post(
  "/",
  authenticate,
  authorize("ORG_ADMIN"),
  validate(createUserSchema),
  controller.createUser,
);

router.get("/", authenticate, authorize("ORG_ADMIN"), controller.listUsers);

module.exports = router;
