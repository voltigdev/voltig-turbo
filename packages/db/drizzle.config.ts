import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const DATABASE_URL = process.env.DATABASE_URL;

export default {
  schema: "./src/schema.ts",
  out: "../db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
  casing: "snake_case",
} satisfies Config;
