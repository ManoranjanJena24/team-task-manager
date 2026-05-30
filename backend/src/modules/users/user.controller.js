const service = require("./user.service");

const createUser = async (req, res, next) => {
  try {
    const result = await service.createUser(req.body, req.user);

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await service.listUsers(req.user);

    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  listUsers,
};
