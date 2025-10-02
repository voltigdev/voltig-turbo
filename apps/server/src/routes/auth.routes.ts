import type { FastifyInstance } from "fastify";
import { handleAuth } from "@/controllers/auth.controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    handler: handleAuth,
  });
}
