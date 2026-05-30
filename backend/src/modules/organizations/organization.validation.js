const { z } = require("zod");

const createOrganizationSchema = z.object({
  organizationName: z.string().min(2).max(100),

  description: z.string().optional(),

  adminName: z.string().min(2).max(100),

  adminEmail: z.email(),
});

module.exports = {
  createOrganizationSchema,
};
