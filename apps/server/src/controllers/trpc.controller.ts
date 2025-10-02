import type { FastifyReply, FastifyRequest } from "fastify";
import { createLogger, extractError, LogContexts } from "@/lib/logger";
import { convertFastifyHeaders } from "@/middleware/utils";
import { handleTrpcRequest } from "@/services/trpc.service";

/**
 * Handle OPTIONS requests for CORS
 */
export async function handleOptions(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  reply.status(204);
  return;
}

/**
 * Handle tRPC requests
 */
export async function handleTrpc(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const logger = createLogger(request.log);

  if (request.method === "OPTIONS") {
    return handleOptions(request, reply);
  }

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

    // Process tRPC request
    const response = await handleTrpcRequest(req);

    // Forward response to client
    reply.status(response.status);
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    const responseBody = response.body ? await response.text() : "";
    await reply.send(responseBody);

    return;
  } catch (error) {
    logger.error("tRPC request failed", {
      ...LogContexts.trpc(),
      ...extractError(error),
    });

    reply.status(500);
    await reply.send({
      error: "Internal tRPC error",
      code: "TRPC_FAILURE",
    });
    return;
  }
}
