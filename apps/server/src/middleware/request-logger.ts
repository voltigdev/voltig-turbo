import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env";
import { createLogger, LogContexts } from "@/lib/logger";

export async function requestLogger(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const logger = createLogger(request.log);
  const startTime = Date.now();

  // Log incoming request
  logger.info("📥 Incoming request", {
    ...LogContexts.request(
      request.method,
      request.url,
      request.headers["user-agent"] as string,
    ),
    ip: request.ip,
    headers: env.NODE_ENV === "development" ? request.headers : undefined,
  });

  // Store start time and logger on request for use in response hook
  (request as any).startTime = startTime;
  (request as any).logger = logger;
}
