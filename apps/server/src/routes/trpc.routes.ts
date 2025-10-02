import type { FastifyInstance } from "fastify";
import { handleTrpc } from "@/controllers/trpc.controller";

export async function trpcRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: ["GET", "POST", "OPTIONS"],
    url: "/api/trpc/*",
    handler: handleTrpc,
  });
}
