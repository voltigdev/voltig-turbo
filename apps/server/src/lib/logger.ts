import type { FastifyBaseLogger } from "fastify";
import { env } from "@/env";

export interface LogContext {
  [key: string]: unknown;
}

export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

class ServerLogger implements Logger {
  private fastifyLogger?: FastifyBaseLogger;

  constructor(fastifyLogger?: FastifyBaseLogger) {
    this.fastifyLogger = fastifyLogger;
  }

  private formatLog(level: string, message: string, context?: LogContext) {
    // Add emoji prefix based on log level and service
    const getLogPrefix = (level: string, context?: LogContext): string => {
      const service = context?.service as string;

      switch (level) {
        case "error":
          return "❌";
        case "warn":
          return "⚠️";
        case "debug":
          return "🔍";
        case "info":
        default:
          // Add service-specific emojis for info logs
          switch (service) {
            case "auth":
              return "🔐";
            case "trpc":
              return "🔄";
            case "admin":
              return "👑";
            case "health":
              return "💚";
            case "server":
              return "🚀";
            default:
              return "ℹ️";
          }
      }
    };

    const emoji = getLogPrefix(level, context);
    const enhancedMessage = `${emoji} ${message}`;

    const logData = {
      msg: enhancedMessage,
      ...context,
    };

    if (this.fastifyLogger) {
      // Use Fastify's logger methods
      switch (level) {
        case "info":
          this.fastifyLogger.info(logData);
          break;
        case "warn":
          this.fastifyLogger.warn(logData);
          break;
        case "error":
          this.fastifyLogger.error(logData);
          break;
        case "debug":
          this.fastifyLogger.debug(logData);
          break;
        default:
          this.fastifyLogger.info(logData);
      }
    } else {
      // Fallback to console for cases where Fastify logger isn't available
      const output =
        env.NODE_ENV === "production"
          ? JSON.stringify(logData)
          : `${enhancedMessage} ${context ? JSON.stringify(context, null, 2) : ""}`;

      console.log(output);
    }
  }

  info(message: string, context?: LogContext): void {
    this.formatLog("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.formatLog("warn", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.formatLog("error", message, context);
  }

  debug(message: string, context?: LogContext): void {
    if (env.NODE_ENV === "development") {
      this.formatLog("debug", message, context);
    }
  }
}

// Create default logger instance
export const logger = new ServerLogger();

// Function to create logger with Fastify context
export function createLogger(fastifyLogger: FastifyBaseLogger): Logger {
  return new ServerLogger(fastifyLogger);
}

// Helper function to extract error details
export function extractError(error: unknown): LogContext {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }

  return {
    error: String(error),
  };
}

// Common log contexts
export const LogContexts = {
  auth: (userId?: string) => ({
    service: "auth",
    userId: userId || "anonymous",
  }),

  trpc: (procedure?: string, userId?: string) => ({
    service: "trpc",
    procedure,
    userId: userId || "anonymous",
  }),

  admin: (userId?: string, action?: string) => ({
    service: "admin",
    userId: userId || "anonymous",
    action,
  }),

  health: () => ({
    service: "health",
  }),

  server: () => ({
    service: "server",
  }),

  request: (method: string, url: string, userAgent?: string) => ({
    type: "request",
    method,
    url,
    userAgent,
  }),

  response: (statusCode: number, responseTime?: number) => ({
    type: "response",
    statusCode,
    responseTime: responseTime ? `${responseTime}ms` : undefined,
  }),

  security: (type: string, userId?: string) => ({
    service: "security",
    type,
    userId: userId || "anonymous",
  }),
} as const;
