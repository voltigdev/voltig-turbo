import type { FastifyInstance } from "fastify";
import { authRoutes } from "@/routes/auth.routes";
import { healthRoutes } from "@/routes/health.routes";
import { trpcRoutes } from "@/routes/trpc.routes";


export async function registerRoutes(fastify: FastifyInstance) {
  // Register all route modules
  await fastify.register(healthRoutes);
  await fastify.register(authRoutes);
  await fastify.register(trpcRoutes);
}
