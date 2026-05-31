const { z } = require("zod");

const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(8),
});


const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

module.exports = {
  loginSchema,
  refreshTokenSchema,
};
