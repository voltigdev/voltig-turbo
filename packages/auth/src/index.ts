import { expo } from "@better-auth/expo";
import { db } from "@repo/db/client";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {  oAuthProxy } from "better-auth/plugins";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
}): ReturnType<typeof betterAuth> {
  const isProduction = process.env.NODE_ENV === "production";

  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    telemetry: {
      enabled: false,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        domain: isProduction ? ".voltig.dev" : undefined,
        httpOnly: true,
      },
    },
    databaseHooks: {},
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [
      oAuthProxy({
        /**
         * Auto-inference blocked by https://github.com/better-auth/better-auth/pull/2891
         */
        currentURL: options.baseUrl,
        productionURL: options.productionUrl,
      }),
      nextCookies(),
      expo(),
    ],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
      maxPasswordLength: 20,
      requireEmailVerification: true,
    },
    trustedOrigins: [
      "voltig://", // This is for mobile app slug
      "http://localhost:3000", // This is for landing page local development
      "http://localhost:3001", // This is for app panel local development
      "http://localhost:3002", // This is for admin panel local development
    ],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];

// Extended session type with role information
export type ExtendedSession = Session & {
  user: Session["user"] & {
    role?: "admin" | "merchant" | "customer";
  };
};

