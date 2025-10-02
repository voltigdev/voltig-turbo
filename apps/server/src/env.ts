import { authEnv } from "@repo/auth/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  extends: [authEnv()],
  server: {
    NODE_ENV: z.enum(["development", "production"]).optional(),
    PORT: z.coerce.number().default(4000),
    API_SECRET_KEY: z.string().optional(),
    RATE_LIMIT_MAX: z.coerce.number().default(100),
    RATE_LIMIT_WINDOW: z.string().default("1 minute"),
    ENABLE_SECURITY_HEADERS: z.boolean().default(true),
    BASE_URL: z.string().optional(),
  },
  client: {},
  clientPrefix: "SERVER_",
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
