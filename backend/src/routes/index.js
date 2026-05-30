const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");

const authenticate = require("../middleware/auth.middleware");

const authorize = require("../middleware/rbac.middleware");

const organizationRoutes = require("../modules/organizations/organization.routes");

const userRoutes = require("../modules/users/user.routes");


router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes);
router.use("/users", userRoutes);

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
