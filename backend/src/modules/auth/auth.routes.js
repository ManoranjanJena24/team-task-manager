const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const validate = require("../../middleware/validation.middleware");

const { loginSchema, refreshTokenSchema } = require("./auth.validation");


router.post("/login", validate(loginSchema), authController.login);
router.post(
  "/refresh-token",

  validate(refreshTokenSchema),

  authController.refreshToken,
);
module.exports = router;
