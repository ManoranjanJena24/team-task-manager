const service = require("./project.service");

const createProject = async (req, res, next) => {
  try {
    const result = await service.createProject(req.body, req.user);

    res.status(201).json({
      status: 201,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await service.getProjects(req.user);

    res.status(200).json({
      status: 200,

      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,

  getProjects,
};
