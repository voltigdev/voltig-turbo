import Constants from "expo-constants";

/**
 * Get the API base URL based on environment
 * - Development: Uses dedicated API server on port 4000
 * - Production: Uses environment variable or falls back to production API URL
 */
export const getBaseUrl = () => {
  // Production URL from environment variable
  const productionUrl = process.env.EXPO_PUBLIC_BASE_URL;

  // Use __DEV__ flag to detect development vs production
  if (!__DEV__) {
    // Production environment
    if (productionUrl) {
      return productionUrl;
    }
    // Fallback production URL - now points to dedicated API app
    return "https://api.voltig.dev";
  }

  // Development environment - point to dedicated API app on port 4000
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // Fallback to localhost if debugger host detection fails
    console.warn("Could not detect localhost, falling back to 127.0.0.1");
    return "http://127.0.0.1:4000";
  }

  return `http://${localhost}:4000`;
};
