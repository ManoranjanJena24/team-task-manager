const { z } = require("zod");

const createProjectSchema = z.object({
  name: z.string().min(2).max(100),

  description: z.string().optional(),
});

module.exports = {
  createProjectSchema,
};
