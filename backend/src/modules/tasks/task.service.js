const AppError = require("../../errors/AppError");

const repository = require("./task.repository");

const { canTransition } = require("./task-status-machine");


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

// const listTasks = async (query, currentUser) => {
//   const page = Number(query.page) || 1;

//   const limit = Number(query.limit) || 10;

//   const result = await repository.getTasks({
//     organizationId: currentUser.organizationId,

//     status: query.status,

//     priority: query.priority,

//     assigneeId: query.assigneeId,

//     page,

//     limit,
//   });

//   return {
//     total: result.count,

//     page,

//     limit,

//     tasks: result.rows,
//   };
// };


const listTasks = async (
  query,
  currentUser
) => {
  const page =
    Number(query.page) || 1;

  const limit =
    Number(query.limit) || 10;

  let assigneeId =
    query.assigneeId;

  if (
    currentUser.role ===
    "MEMBER"
  ) {
    assigneeId =
      currentUser.userId;
  }

  const result =
    await repository.getTasks({
      organizationId:
        currentUser.organizationId,

      status:
        query.status,

      priority:
        query.priority,

      assigneeId,

      page,

      limit
    });

  return {
    total:
      result.count,

    page,

    limit,

    tasks:
      result.rows
  };
};

const getTask = async (taskId, currentUser) => {
  const task = await repository.getTaskById(taskId);

  if (!task) {
    throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
  }

  if (task.organizationId !== currentUser.organizationId) {
    throw new AppError(403, "FORBIDDEN", "Access denied");
  }

  if (currentUser.role === "MEMBER" && task.assigneeId !== currentUser.userId) {
    throw new AppError(403, "FORBIDDEN", "Access denied");
  }

  return task;
};


const updateTask = async (taskId, payload, currentUser) => {
  const task = await repository.getTaskById(taskId);

  if (!task) {
    throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
  }

  if (task.organizationId !== currentUser.organizationId) {
    throw new AppError(403, "FORBIDDEN", "Access denied");
  }

  await repository.updateTaskById(taskId, payload);

  return repository.getTaskById(taskId);
};


const deleteTask = async (taskId, currentUser) => {
  const task = await repository.getTaskById(taskId);

  if (!task) {
    throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
  }

  if (task.organizationId !== currentUser.organizationId) {
    throw new AppError(403, "FORBIDDEN", "Access denied");
  }

  await repository.deleteTask(taskId);
};

const updateStatus = async (taskId, newStatus, currentUser) => {
  const task = await repository.getTaskById(taskId);

  if (!task) {
    throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
  }

  if (task.organizationId !== currentUser.organizationId) {
    throw new AppError(403, "FORBIDDEN", "Access denied");
  }

  const isManager = currentUser.role === "MANAGER";

  const isAssignee = task.assigneeId === currentUser.userId;

  if (!isManager && !isAssignee) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "Only assignee or manager can update task status",
    );
  }

  const valid = canTransition(task.status, newStatus);

  if (!valid) {
    throw new AppError(
      400,
      "INVALID_STATUS_TRANSITION",
      `Cannot move from ${task.status} to ${newStatus}`,
    );
  }

  const updatePayload = {
    status: newStatus,
  };

  if (newStatus === "DONE") {
    updatePayload.completedAt = new Date();
  }

  await repository.updateTaskById(taskId, updatePayload);

  return repository.getTaskById(taskId);
};

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
};
