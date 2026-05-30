const AppError = require("../../errors/AppError");

const repository = require("./task.repository");

const createTask = async (payload, currentUser) => {
  const project = await repository.findProjectById(payload.projectId);

  if (!project) {
    throw new AppError(404, "PROJECT_NOT_FOUND", "Project not found");
  }

  if (project.organizationId !== currentUser.organizationId) {
    throw new AppError(403, "FORBIDDEN", "Invalid project");
  }

  const assignee = await repository.findUserById(payload.assigneeId);

  if (!assignee) {
    throw new AppError(404, "USER_NOT_FOUND", "Assignee not found");
  }

  if (assignee.organizationId !== currentUser.organizationId) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "Assignee belongs to another organization",
    );
  }

  return repository.createTask({
    ...payload,

    organizationId: currentUser.organizationId,

    createdBy: currentUser.userId,
  });
};

const listTasks = async (query, currentUser) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const result = await repository.getTasks({
    organizationId: currentUser.organizationId,

    status: query.status,

    priority: query.priority,

    assigneeId: query.assigneeId,

    page,

    limit,
  });

  return {
    total: result.count,

    page,

    limit,

    tasks: result.rows,
  };
};

module.exports = {
  createTask,

  listTasks,
};
