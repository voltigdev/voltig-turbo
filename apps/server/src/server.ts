import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { corsConfig } from "@/config/cors";
import { env } from "@/env";

import { LogContexts, logger } from "@/lib/logger";
import { errorHandler } from "@/middleware/error-handler";
import { requestLogger } from "@/middleware/request-logger";
import { configureSecurity } from "@/middleware/security";
import { registerRoutes } from "@/routes/index";

const fastify = Fastify({
  logger:
    env.NODE_ENV === "development"
      ? {
          level: "debug",
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss.l",
              ignore: "pid,hostname,reqId,responseTime",
              messageFormat: "{msg}",
              customPrettifiers: {
                time: (timestamp: string) => `🕐 ${timestamp}`,
              },
              singleLine: false,
            },
          },
        }
      : {
          level: "info",
        },
  disableRequestLogging: true, // We'll handle request logging in our middleware
});

// Register error handler
fastify.setErrorHandler(errorHandler);

// Configure security middleware
await configureSecurity(fastify);

// Register request logging hooks
fastify.addHook("onRequest", requestLogger);

// Register response logging hook
fastify.addHook("onResponse", async (request, reply) => {
  const logger = (request as any).logger;
  const startTime = (request as any).startTime;

  if (logger && startTime) {
    const responseTime = Date.now() - startTime;
    const level = reply.statusCode >= 400 ? "warn" : "info";

    logger[level]("📤 Request completed", {
      ...LogContexts.response(reply.statusCode, responseTime),
      method: request.method,
      url: request.url,
      ip: request.ip,
    });
  }
});

// Configure CORS
await fastify.register(fastifyCors, corsConfig);

// Register all routes
await fastify.register(registerRoutes);

// Initialize server
const start = async () => {
  try {
    logger.info("Starting Voltig Turbo API server...", LogContexts.server());

    await fastify.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    logger.info("Server started successfully", {
      ...LogContexts.server(),
      port: env.PORT,
      host: "0.0.0.0",
      environment: env.NODE_ENV,
      pid: process.pid,
      nodeVersion: process.version,
    });

    logger.info("API endpoints available", {
      ...LogContexts.server(),
      endpoints: [
        "GET  /",
        "ALL  /api/auth/*",
        "ALL  /api/trpc/*",
      ],
      baseUrl: `http://localhost:${env.PORT}`,
    });
  } catch (err) {
    logger.error("Failed to start server", {
      ...LogContexts.server(),
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  logger.info(
    "Received SIGTERM, shutting down gracefully",
    LogContexts.server(),
  );
  await fastify.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  logger.info(
    "Received SIGINT, shutting down gracefully",
    LogContexts.server(),
  );
  await fastify.close();
  process.exit(0);
});

start();
