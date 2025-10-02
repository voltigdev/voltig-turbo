import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { createLogger, extractError } from "@/lib/logger";

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const logger = createLogger(request.log);

  // Handle validation errors
  if (error.validation) {
    logger.warn("Validation error occurred", {
      ...extractError(error),
      validation: error.validation,
      url: request.url,
      method: request.method,
    });

    reply.status(400).send({
      error: "Validation Error",
      code: "VALIDATION_ERROR",
      details: error.validation,
    });
    return;
  }

  // Log the error with context
  logger.error("Unhandled error occurred", {
    ...extractError(error),
    statusCode: error.statusCode || 500,
    url: request.url,
    method: request.method,
    userAgent: request.headers["user-agent"],
  });

  // Handle generic errors
  reply.status(error.statusCode || 500).send({
    error: error.message || "Internal Server Error",
    code: error.code || "INTERNAL_ERROR",
  });
};
