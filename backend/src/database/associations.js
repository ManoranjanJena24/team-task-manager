const Organization = require("./models/organization.model");
const User = require("./models/user.model");
const RefreshToken = require("./models/refresh-token.model");
const Project = require("./models/project.model");
const Task = require("./models/task.model");

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

Organization.hasMany(Project, {
  foreignKey: "organizationId",
});

Project.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Organization.hasMany(Task, {
  foreignKey: "organizationId",
});

Task.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Project.hasMany(Task, {
  foreignKey: "projectId",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
});

User.hasMany(Task, {
  foreignKey: "assigneeId",
});

Task.belongsTo(User, {
  foreignKey: "assigneeId",
  as: "assignee",
});

User.hasMany(Task, {
  foreignKey: "createdBy",
  as: "createdTasks",
});

Task.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});