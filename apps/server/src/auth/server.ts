import { initAuth } from "@repo/auth";
import { env } from "../env.js";

const baseUrl = (() => {
  // Use explicit BASE_URL if provided (for development flexibility)
  if (env.BASE_URL) {
    return env.BASE_URL;
  }

  if (env.NODE_ENV === "production") {
    // For production API
    return "https://api.voltig.dev";
  }

  // Development fallbacks - try to use network-accessible URLs
  // Check if we're running in a container or need external access
  const port = env.PORT || 4000;

  // For mobile development, prefer network-accessible URLs
  // This can be overridden by setting BASE_URL env var
  return `http://localhost:${port}`;
})();

export const auth = initAuth({
  baseUrl,
  productionUrl: "https://api.voltig.dev",
  secret: env.AUTH_SECRET,
});

export const getSession = async (headers: Headers = new Headers()) =>
  auth.api.getSession({
    headers,
  });
