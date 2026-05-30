const { z } = require("zod");

const createTaskSchema = z.object({
  projectId: z.uuid(),

  title: z.string().min(2).max(200),

  description: z.string().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),

  assigneeId: z.uuid(),

  dueDate: z.string(),
});

const updateTaskSchema = z.object({
  title: z.string().min(2).max(200).optional(),

  description: z.string().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

  dueDate: z.string().optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
