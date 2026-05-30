const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const validate = require("../../middleware/validation.middleware");

const { loginSchema } = require("./auth.validation");

router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
