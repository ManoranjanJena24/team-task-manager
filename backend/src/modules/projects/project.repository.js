const Project = require("../../database/models/project.model");

const createProject = (payload) => {
  return Project.create(payload);
};

const getProjects = (organizationId) => {
  return Project.findAll({
    where: {
      organizationId,
    },
  });
};

module.exports = {
  createProject,

  getProjects,
};
