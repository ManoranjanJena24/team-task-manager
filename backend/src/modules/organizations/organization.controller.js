const service = require("./organization.service");

const createOrganization = async (req, res, next) => {
  try {
    const result = await service.createOrganization(req.body);

    return res.status(201).json({
      status: 201,

      message: "Organization created successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganization,
};
