const AppError = require("../../errors/AppError");

const repository = require("./task.repository");

const { canTransition } = require("./task-status-machine");

const { getCache, setCache } = require("../../common/utils/cache");

const { buildTaskCacheKey } = require("./task-cache");
const { invalidateTaskCache } = require("./task-cache.service");


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

  // return repository.createTask({
  //   ...payload,

  //   organizationId: currentUser.organizationId,

  //   createdBy: currentUser.userId,
  // });

  const task = await repository.createTask({
    ...payload,

    organizationId: currentUser.organizationId,

    createdBy: currentUser.userId,
  });

  await invalidateTaskCache(payload.assigneeId);

  return task;
};



// const listTasks = async (
//   query,
//   currentUser
// ) => {
//   const page =
//     Number(query.page) || 1;

//   const limit =
//     Number(query.limit) || 10;

//   let assigneeId =
//     query.assigneeId;

//   if (
//     currentUser.role ===
//     "MEMBER"
//   ) {
//     assigneeId =
//       currentUser.userId;
//   }

//   const result =
//     await repository.getTasks({
//       organizationId:
//         currentUser.organizationId,

//       status:
//         query.status,

//       priority:
//         query.priority,

//       assigneeId,

//       page,

//       limit
//     });

//   return {
//     total:
//       result.count,

//     page,

//     limit,

//     tasks:
//       result.rows
//   };
// };



const listTasks = async (query, currentUser) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  let assigneeId = query.assigneeId;

  if (currentUser.role === "MEMBER") {
    assigneeId = currentUser.userId;
  }

  const cacheKey = buildTaskCacheKey({
    userId: currentUser.userId,

    status: query.status,

    priority: query.priority,

    page,

    limit,
  });
  console.log("Looking for cache", cacheKey)

  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    console.log("Returning tasks from cache");

    return cachedData;
  }

  const result = await repository.getTasks({
    organizationId: currentUser.organizationId,

    status: query.status,

    priority: query.priority,

    assigneeId,

    page,

    limit,
  });

  const response = {
    total: result.count,

    page,

    limit,

    tasks: result.rows,
  };

  console.log("Saving to cache", cacheKey , response)

  await setCache(cacheKey, response);

  return response;
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
await invalidateTaskCache(task.assigneeId);
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
 await invalidateTaskCache(task.assigneeId);
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
  await invalidateTaskCache(task.assigneeId);

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
