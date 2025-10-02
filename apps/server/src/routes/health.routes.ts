import type { FastifyInstance } from "fastify";
import { healthCheck } from "@/controllers/health.controller";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/", healthCheck);
}
