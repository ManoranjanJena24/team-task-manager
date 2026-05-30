const service = require("./task.service");

const createTask = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await service.createTask(
        req.body,
        req.user
      );

    return res.status(201).json({
      status: 201,
      message:
        "Task created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const listTasks = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await service.listTasks(
        req.query,
        req.user
      );

    return res.status(200).json({
      status: 200,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await service.getTask(
        req.params.id,
        req.user
      );

    return res.status(200).json({
      status: 200,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const updatedTask =
      await service.updateTask(
        req.params.id,
        req.body,
        req.user
      );

    return res.status(200).json({
      status: 200,
      message:
        "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    await service.deleteTask(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      status: 200,
      message:
        "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (
  req,
  res,
  next
) => {
  try {
    const updatedTask =
      await service.updateStatus(
        req.params.id,
        req.body.status,
        req.user
      );

    return res.status(200).json({
      status: 200,
      message:
        "Task status updated successfully",
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus
};