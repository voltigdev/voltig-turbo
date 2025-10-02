import { auth } from "@/auth/server";

/**
 * Handle Better Auth requests
 */
export async function handleAuthRequest(request: Request): Promise<Response> {
  return await auth.handler(request);
}

/**
 * Get session from request headers
 */
export async function getSession(headers: Headers) {
  return await auth.api.getSession({ headers });
}
