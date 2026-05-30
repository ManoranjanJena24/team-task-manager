const repository = require("./project.repository");

const createProject = async (payload, user) => {
  return repository.createProject({
    ...payload,

    organizationId: user.organizationId,
  });
};

const getProjects = async (user) => {
  return repository.getProjects(user.organizationId);
};

module.exports = {
  createProject,

  getProjects,
};
