const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/rbac.middleware");

const validate = require("../../middleware/validation.middleware");

const controller = require("./task.controller");

const { createTaskSchema } = require("./task.validation");

router.post(
  "/",

  authenticate,

  authorize("ORG_ADMIN", "MANAGER"),

  validate(createTaskSchema),

  controller.createTask,
);

router.get(
  "/",

  authenticate,

  controller.listTasks,
);

module.exports = router;
