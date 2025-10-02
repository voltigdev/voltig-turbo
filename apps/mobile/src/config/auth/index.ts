import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { getBaseUrl } from "@/config/base-url";

// Better Auth client for Expo (native) + Convex integration
// Base URL points to Convex HTTP routes registered by Better Auth at /auth
export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    emailOTPClient(),
    expoClient({
      scheme: "voltig-turbo", // Must match app.config.ts scheme
      storagePrefix: "vt",
      storage: SecureStore,
    }),
  ],
});

export type AuthClient = typeof authClient;