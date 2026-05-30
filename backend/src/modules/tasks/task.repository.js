const { Op } = require("sequelize");

const Task = require(
  "../../database/models/task.model"
);

const User = require(
  "../../database/models/user.model"
);

const Project = require(
  "../../database/models/project.model"
);

const createTask = (
  payload
) => {
  return Task.create(payload);
};

const findProjectById = (
  projectId
) => {
  return Project.findByPk(
    projectId
  );
};

const findUserById = (
  userId
) => {
  return User.findByPk(userId);
};

const findTaskById = (
  taskId
) => {
  return Task.findByPk(taskId);
};

const updateTask = (
  taskId,
  payload
) => {
  return Task.update(
    payload,
    {
      where: {
        id: taskId
      }
    }
  );
};

const deleteTask = (
  taskId
) => {
  return Task.destroy({
    where: {
      id: taskId
    }
  });
};

const getTasks = ({
  organizationId,

  status,

  priority,

  assigneeId,

  page,

  limit
}) => {
  const where = {
    organizationId
  };

  if (status)
    where.status = status;

  if (priority)
    where.priority =
      priority;

  if (assigneeId)
    where.assigneeId =
      assigneeId;

  return Task.findAndCountAll({
    where,

    limit,

    offset:
      (page - 1) * limit,

    order: [
      ["createdAt", "DESC"]
    ]
  });
};

module.exports = {
  createTask,

  findProjectById,

  findUserById,

  findTaskById,

  updateTask,

  deleteTask,

  getTasks
};