import type { FastifyReply, FastifyRequest } from "fastify";
import { createLogger, extractError, LogContexts } from "@/lib/logger";
import { convertFastifyHeaders } from "@/middleware/utils";
import { handleAuthRequest } from "@/services/auth.service";

/**
 * Handle all Better Auth requests
 */
export async function handleAuth(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const logger = createLogger(request.log);

  try {
    // Construct request URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Convert Fastify headers to standard Headers object
    const headers = convertFastifyHeaders(request);

    // Create Fetch API-compatible request
    const req = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });

    // Process authentication request
    const response = await handleAuthRequest(req);

    // Forward response to client
    reply.status(response.status);
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    const responseBody = response.body ? await response.text() : "";
    await reply.send(responseBody);

    return;
  } catch (error) {
    logger.error("Authentication request failed", {
      ...LogContexts.auth(),
      ...extractError(error),
    });

    reply.status(500);
    await reply.send({
      error: "Internal authentication error",
      code: "AUTH_FAILURE",
    });
    return;
  }
}
