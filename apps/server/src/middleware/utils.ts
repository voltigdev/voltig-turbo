import type { FastifyRequest } from "fastify";

/**
 * Convert Fastify headers to standard Headers object
 */
export function convertFastifyHeaders(request: FastifyRequest): Headers {
  const headers = new Headers();
  Object.entries(request.headers).forEach(([key, value]) => {
    if (value) {
      headers.append(
        key,
        Array.isArray(value) ? value.join(", ") : value.toString(),
      );
    }
  });
  return headers;
}

/**
 * Convert Fastify headers to Headers object for auth API
 */
export function convertHeadersForAuth(request: FastifyRequest): Headers {
  return new Headers(
    Object.entries(request.headers).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : value?.toString() || "",
    ]),
  );
}
