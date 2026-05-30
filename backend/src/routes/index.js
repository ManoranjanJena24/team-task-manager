const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");

const authenticate = require("../middleware/auth.middleware");

const authorize = require("../middleware/rbac.middleware");

router.use("/auth", authRoutes);

router.get(
  "/admin-test",
  authenticate,
  authorize("PLATFORM_ADMIN"),
  (req, res) => {
    res.json({
      message: "Platform admin access granted",
    });
  },
);

module.exports = router;
