import type { FastifyReply, FastifyRequest } from "fastify";
import type { HealthCheckResponse } from "@/types/index";

/**
 * Health check endpoint
 */
export async function healthCheck(
  _request: FastifyRequest,
  _reply: FastifyReply,
): Promise<HealthCheckResponse> {
  return {
    message: "Voltig API",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: ["/api/auth/*", "/api/trpc/*"],
  };
}
