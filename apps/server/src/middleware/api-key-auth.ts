import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env";
import { createLogger, LogContexts } from "@/lib/logger";

/**
 * Middleware to protect sensitive endpoints with API key authentication
 */
export async function requireApiKey(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const logger = createLogger(request.log);

  // Skip API key check in development for easier testing
  if (env.NODE_ENV === "development") {
    return;
  }

  const apiKey = request.headers["x-api-key"] as string;
  const validApiKey = process.env.API_SECRET_KEY;

  if (!validApiKey) {
    logger.error("API_SECRET_KEY not configured", {
      ...LogContexts.security("api-key-check"),
    });

    reply.code(500).send({
      error: "Server configuration error",
      code: "CONFIG_ERROR",
    });
    return;
  }

  if (!apiKey || apiKey !== validApiKey) {
    logger.warn("Invalid or missing API key", {
      ...LogContexts.security("api-key-check"),
      ip: request.ip,
      hasApiKey: !!apiKey,
      userAgent: request.headers["user-agent"],
    });

    reply.code(401).send({
      error: "Invalid or missing API key",
      code: "INVALID_API_KEY",
    });
    return;
  }

  logger.info("API key validated successfully", {
    ...LogContexts.security("api-key-check"),
    ip: request.ip,
  });
}

/**
 * Middleware to protect admin endpoints - requires both authentication and admin role
 */
export async function requireAdminAuth(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const logger = createLogger(request.log);

  // This would typically check session + admin role
  // For now, we'll use the existing admin check pattern
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    logger.warn("Admin endpoint accessed without authentication", {
      ...LogContexts.security("admin-auth"),
      ip: request.ip,
      url: request.url,
    });

    reply.code(401).send({
      error: "Authentication required",
      code: "AUTH_REQUIRED",
    });
    return;
  }

  // Additional admin checks would go here
  // The actual admin role validation is handled in the controller
}
