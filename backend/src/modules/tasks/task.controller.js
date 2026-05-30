const service = require("./task.service");

const createTask = async (req, res, next) => {
  try {
    const result = await service.createTask(req.body, req.user);

    res.status(201).json({
      status: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const listTasks = async (req, res, next) => {
  try {
    const result = await service.listTasks(req.query, req.user);

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  listTasks,
};
