import type { ConfigContext, ExpoConfig } from "@expo/config";
import type { AppIconBadgeConfig } from "app-icon-badge/types";
import { ClientEnv, Env } from "./env.js";

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== "production",
  badges: [
    {
      type: "banner",
      color: "white",
      text: Env.APP_ENV,
    },
    {
      text: Env.VERSION.toString(),
      type: "ribbon",
      color: "white",
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME}`,
  slug: Env.SLUG,
  newArchEnabled: true,
  version: Env.VERSION,
  orientation: "portrait",
  scheme: Env.SCHEME,
  userInterfaceStyle: "automatic",
  // Enable edge-to-edge globally
  runtimeVersion: {
    policy: "appVersion",
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
  },
  assetBundlePatterns: ["**/*"],
  icon: "./assets/icon.png", // Base icon for app-icon-badge plugin
  ios: {
    // googleServicesFile: `./${Env.FIREBASE_FILE}`,
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    entitlements: {
      "aps-environment": Env.APP_ENV,
    },
    infoPlist: {
      UIBackgroundModes: ["remote-notification"],
      ITSAppUsesNonExemptEncryption: false,
      NSCameraUsageDescription:
        "This app uses the camera to scan receipts and documents for rewards processing.",
    },
  },
  android: {
    // googleServicesFile: `./${Env.ANDROID_FIREBASE_FILE}`,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
    },
    package: Env.PACKAGE,
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow Votilg Speed to use your location.",
      },
    ],
    ["app-icon-badge", appIconBadgeConfig],
    "expo-notifications",
    "expo-router",
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
    baseUrl: "/",
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  owner: Env.EXPO_ACCOUNT_OWNER,
});
