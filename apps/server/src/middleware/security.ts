import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";
import { env } from "@/env";

/**
 * Configure security middleware for the Fastify instance
 */
export async function configureSecurity(fastify: FastifyInstance) {
  // Security headers via helmet
  await fastify.register(helmet, {
    // Configure CSP for your domains
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://api.voltig.dev",
          ...(env.NODE_ENV === "development"
            ? ["http://localhost:*", "ws://localhost:*"]
            : []),
        ],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow iframe embedding if needed
  });

  // Rate limiting with different limits for different routes
  await fastify.register(rateLimit, {
    global: true,
    max: 100, // General rate limit: 100 requests per minute
    timeWindow: "1 minute",
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
    },
    skipOnError: false,
    ban: 10, // Ban after 10 violations
    onBanReach: (req, key) => {
      fastify.log.warn(
        {
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        },
        `Rate limit ban triggered for ${key}`,
        {
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        },
      );
    },
    onExceeding: (req) => {
      fastify.log.warn({
        ip: req.ip,
        url: req.url,
        userAgent: req.headers["user-agent"],
      });
    },
  });

  // Stricter rate limiting for auth endpoints
  await fastify.register(async function authRateLimit(fastify) {
    await fastify.register(rateLimit, {
      max: 10, // Auth: 10 requests per minute
      timeWindow: "1 minute",
      nameSpace: "auth",
      skipOnError: false,
    });

    fastify.addHook("onRequest", async (request) => {
      if (request.url.startsWith("/api/auth/")) {
        // This hook will apply the auth rate limit
      }
    });
  });

  // Even stricter for login/register
  await fastify.register(async function strictAuthRateLimit(fastify) {
    await fastify.register(rateLimit, {
      max: 5, // Login/Register: 5 attempts per 5 minutes
      timeWindow: "5 minutes",
      nameSpace: "auth-strict",
      skipOnError: false,
    });

    fastify.addHook("onRequest", async (request) => {
      const isLoginOrRegister =
        request.url.includes("/sign-in") ||
        request.url.includes("/sign-up") ||
        request.url.includes("/verify-email");

      if (isLoginOrRegister) {
        // This hook will apply the strict auth rate limit
      }
    });
  });

  // Request size limits
  fastify.addHook("onRequest", async (request, reply) => {
    const contentLength = request.headers["content-length"];
    if (contentLength && Number.parseInt(contentLength) > 1024 * 1024) {
      // 1MB limit
      fastify.log.warn({
        contentLength,
        ip: request.ip,
        url: request.url,
      });

      reply.code(413).send({
        error: "Request entity too large",
        code: "PAYLOAD_TOO_LARGE",
      });
    }
  });

  // Security logging hook
  fastify.addHook("onRequest", async (request) => {
    const suspiciousPatterns = [
      /\.\.\//, // Directory traversal
      /<script/i, // XSS attempts
      /union.*select/i, // SQL injection
      /javascript:/i, // Javascript protocol
    ];

    const url = request.url.toLowerCase();
    const userAgent = request.headers["user-agent"]?.toLowerCase() || "";

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url) || pattern.test(userAgent)) {
        fastify.log.warn(
          {
            ip: request.ip,
            url: request.url,
            userAgent: request.headers["user-agent"],
            pattern: pattern.toString(),
          },
          "Suspicious request detected",
        );
        break;
      }
    }
  });
}
