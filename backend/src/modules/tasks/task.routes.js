const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/rbac.middleware");

const validate = require("../../middleware/validation.middleware");

const controller = require("./task.controller");

const { createTaskSchema  } = require("./task.validation");
const { updateTaskSchema, updateStatusSchema } = require("./task.validation");

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

router.get("/:id", authenticate, controller.getTask);
router.patch(
  "/:id",

  authenticate,

  authorize("ORG_ADMIN", "MANAGER"),

  validate(updateTaskSchema),

  controller.updateTask,
);

router.delete(
  "/:id",

  authenticate,

  authorize("ORG_ADMIN", "MANAGER"),

  controller.deleteTask,
);

router.patch(
  "/:id/status",

  authenticate,

  validate(updateStatusSchema),

  controller.updateStatus,
);
module.exports = router;
