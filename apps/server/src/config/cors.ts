import type { FastifyCorsOptions } from "@fastify/cors";
import { env } from "../env.js";

export const corsConfig: FastifyCorsOptions = {
  origin:
    env.NODE_ENV === "production"
      ? [
          "https://admin.voltig.dev",
          "https://turbo.voltig.dev",
          "https://merchant.voltig.dev",
        ]
      : [
          "http://localhost:3000",
          "http://localhost:3001", // Admin app
          "http://localhost:3002", // Merchant app
        ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
    "x-trpc-source",
    "trpc-accept",
  ],
  exposedHeaders: ["Set-Cookie"],
  credentials: true,
  maxAge: 86400,
};
