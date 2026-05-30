const Organization = require("./models/organization.model");
const User = require("./models/user.model");
const RefreshToken = require("./models/refresh-token.model");

Organization.hasMany(User, {
  foreignKey: "organizationId",
});

User.belongsTo(Organization, {
  foreignKey: "organizationId",
});

User.hasMany(RefreshToken, {
  foreignKey: "userId",
});

RefreshToken.belongsTo(User, {
  foreignKey: "userId",
});
