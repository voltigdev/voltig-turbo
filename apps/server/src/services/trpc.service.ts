import { appRouter, createTRPCContext } from "@repo/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { auth } from "@/auth/server";

/**
 * Handle tRPC requests
 */
export async function handleTrpcRequest(request: Request): Promise<Response> {
  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: request,
    createContext: () =>
      createTRPCContext({
        auth: auth,
        headers: request.headers,
      }),
    onError({ error, path }) {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
      );
    },
  });
}
