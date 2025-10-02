# Mobile App - Voltig Turbo

The **Voltig Turbo** mobile application is a React Native app built with Expo 54, featuring receipt scanning, location-based rewards, and cross-platform authentication.

## Overview

Voltig Turbo is the mobile companion app for Voltig Turbo. This is a starter template for a React Native app built with Expo 54.

### Key Features

- **Receipt Scanning**: Camera integration for scanning receipts
- **Location Services**: Find nearby merchants and rewards
- **Push Notifications**: Real-time updates on rewards and activities
- **Offline Support**: Secure storage with expo-secure-store
- **Deep Linking**: Support for `voltig://` scheme
- **Dark Mode**: Automatic theme switching
- **Type-Safe API**: tRPC integration with end-to-end type safety

## Tech Stack

- **Expo** 54.0.12 (React Native 0.81.4)
- **Expo Router** 6.0.10 (file-based routing)
- **NativeWind** (Tailwind CSS for React Native)
- **React Query** + **tRPC** (data fetching)
- **Better Auth** (authentication)
- **Zustand** (state management)
- **Reanimated** (animations)

## Project Structure

```
mobile/
├── app/              # Expo Router pages (file-based routing)
│   ├── _layout.tsx   # Root layout
│   ├── index.tsx     # Home screen
│   └── ...           # Other screens
├── src/
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   └── lib/          # Libraries and configurations
├── assets/           # Images, fonts, and other assets
├── app.config.ts     # Expo configuration
└── env.js            # Environment variable validation

```

## Getting Started

### Prerequisites

- Node.js >= 22.20.0
- pnpm >= 10.17.1
- Expo CLI (installed as dependency)
- **iOS Development:**
  - macOS with Xcode 15+
  - iOS 15+ simulator or device
- **Android Development:**
  - Android Studio
  - Android SDK 33+
  - Android emulator or device

### Installation

```bash
# From monorepo root
cd apps/mobile

# Install dependencies (if not done from root)
pnpm install
```

### Environment Setup

The app uses environment-specific configuration. Ensure `.env.development` exists in the monorepo root:

```bash
# App Environment
APP_ENV=development

# API URL
EXPO_PUBLIC_BASE_URL=http://localhost:4000

# Analytics (optional)
EXPO_PUBLIC_POSTHOG_API_KEY=your_key
EXPO_PUBLIC_POSTHOG_HOSTNAME=https://us.i.posthog.com
```

### Development

```bash
# Start Expo dev server
pnpm dev

# Or from monorepo root
pnpm -F mobile dev
```

This will:

- Start the Metro bundler
- Show QR code for Expo Go app
- Provide options to open in iOS Simulator or Android Emulator

### Building for Devices

#### iOS Development Build

```bash
# Generate native iOS project
pnpm prebuild:development

# Run on iOS simulator/device
pnpm run:ios:development

# Or from monorepo root
pnpm ios:development
```

#### Android Development Build

```bash
# Generate native Android project
pnpm prebuild:development

# Run on Android emulator/device
pnpm run:android:development

# Or from monorepo root
pnpm android:development
```

### Production Builds

```bash
# iOS Production
pnpm prebuild:production
pnpm run:ios:production

# Android Production
pnpm prebuild:production
pnpm run:android:production
```

## App Configuration

### App Identity

- **Name**: Voltig Speed
- **Bundle ID**: `dev.voltig.speed` (development: `dev.voltig.speed.development`)
- **Package**: `dev.voltig.speed`
- **Scheme**: `voltig://`
- **EAS Project ID**: `b471a1ce-67dc-415f-88bc-150ebf15c3f4`
- **Expo Account**: `infra-voltig`

### App Icon Badging

Development builds automatically show environment badges:

- Banner: Environment name (development/staging)
- Ribbon: Version number

This is disabled in production builds.

### Permissions

The app requests the following permissions:

#### iOS

- **Camera**: "This app uses the camera to scan receipts and documents for rewards processing."
- **Location**: "Allow Voltig Speed to use your location."
- **Notifications**: For push notifications

#### Android

- Camera access
- Location access (foreground and background)
- Notification access

## Routing

The app uses **Expo Router** (file-based routing). Routes are automatically generated from the `app/` directory structure:

```
app/
├── _layout.tsx          # Root layout (authentication wrapper)
├── index.tsx            # Home screen (/)
├── (auth)/             # Auth group (routes with auth required)
│   ├── profile.tsx     # /profile
│   └── rewards.tsx     # /rewards
└── login.tsx           # /login
```

### Navigation

```tsx
import { router } from "expo-router";

// Navigate to route
router.push("/profile");

// Replace current route
router.replace("/login");

// Go back
router.back();
```

## Styling

### NativeWind (Tailwind CSS)

The app uses **NativeWind** for styling with Tailwind CSS:

```tsx
import { View, Text } from "react-native";

export function Card() {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <Text className="text-lg font-bold">Card Title</Text>
    </View>
  );
}
```

### Dark Mode

Dark mode is automatically supported through system preferences:

```tsx
import { useColorScheme } from "react-native";

export function ThemedComponent() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return <View className={isDark ? "bg-gray-900" : "bg-white"} />;
}
```

## Authentication

### Better Auth Integration

```tsx
import { useAuth } from "@/hooks/useAuth";

export function ProfileScreen() {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (!user) return <LoginPrompt />;

  return (
    <View>
      <Text>Welcome {user.name}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}
```

### Secure Storage

Tokens are stored securely using `expo-secure-store`:

```tsx
import * as SecureStore from "expo-secure-store";

// Save token
await SecureStore.setItemAsync("auth_token", token);

// Retrieve token
const token = await SecureStore.getItemAsync("auth_token");

// Delete token
await SecureStore.deleteItemAsync("auth_token");
```

## API Integration

### tRPC Client

```tsx
import { api } from "@/utils/api";

export function RewardsScreen() {
  const { data: rewards, isLoading } = api.rewards.list.useQuery();

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={rewards}
      renderItem={({ item }) => <RewardCard reward={item} />}
    />
  );
}
```

### Mutations

```tsx
const createReward = api.rewards.create.useMutation({
  onSuccess: () => {
    // Invalidate and refetch
    api.useUtils().rewards.list.invalidate();
  },
});

// Use mutation
createReward.mutate({
  title: "New Reward",
  points: 100,
});
```

## State Management

### Zustand Store

```tsx
import { create } from "zustand";

interface AppState {
  count: number;
  increment: () => void;
}

export const useStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Notifications

### Setup

```tsx
import * as Notifications from "expo-notifications";

// Request permissions
const { status } = await Notifications.requestPermissionsAsync();

// Get push token
const token = (await Notifications.getExpoPushTokenAsync()).data;

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

## Deep Linking

The app supports the `voltig://` URL scheme:

```bash
# Open app to specific route
voltig://rewards

# With parameters
voltig://reward/123
```

### Handling Links

```tsx
import * as Linking from "expo-linking";

// Parse URL
const url = await Linking.getInitialURL();
const { path, queryParams } = Linking.parse(url);

// Open URL
Linking.openURL("voltig://rewards");
```

## Debugging

### React Native Debugger

1. Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
2. Start debugger on port 19000
3. Open developer menu in app (shake device or Cmd+D/Ctrl+M)
4. Select "Debug"

### Expo Dev Tools

- Press `m` in terminal to open menu
- Press `j` to open debugger
- Press `r` to reload app
- Press `i` to open iOS simulator
- Press `a` to open Android emulator

### Logging

```tsx
console.log("Debug info");
console.warn("Warning");
console.error("Error");
```

Logs appear in Metro bundler terminal.

## Testing

### Unit Tests

```bash
# Run tests (when configured)
pnpm test
```

### E2E Tests (Maestro)

```bash
# From monorepo root
pnpm maestro:test
```

## Common Issues

### Metro Bundler Cache

If you encounter build issues:

```bash
# Clear cache
pnpm dev --clear

# Or manually
rm -rf .expo node_modules
pnpm install
```

### Native Module Errors

After adding native dependencies:

```bash
# Regenerate native projects
pnpm prebuild:development --clean
```

### iOS Build Errors

```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && pod install && cd ..
```

### Android Build Errors

```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
```

## Scripts

```bash
# Development
pnpm dev                      # Start dev server
pnpm prebuild                 # Generate native projects
pnpm prebuild:development     # Prebuild with dev config
pnpm prebuild:production      # Prebuild with prod config

# Run on devices
pnpm android                  # Run on Android
pnpm ios                      # Run on iOS
pnpm run:android:development  # Android dev build
pnpm run:ios:development      # iOS dev build
pnpm run:android:production   # Android prod build
pnpm run:ios:production       # iOS prod build

# Utilities
pnpm format                   # Format code with Biome
pnpm expo-check               # Check Expo dependencies
pnpm clean                    # Clean build artifacts
```

## EAS Build (Production)

For production builds with EAS:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## Performance Tips

1. **Use React.memo** for expensive components
2. **Optimize images** with appropriate sizes
3. **Use FlatList** instead of ScrollView for long lists
4. **Enable Hermes** (already enabled)
5. **Use Reanimated** for 60fps animations
6. **Minimize bundle size** by code splitting

## Related Documentation

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Docs](https://expo.github.io/router/docs)
- [React Native Docs](https://reactnative.dev)
- [NativeWind Docs](https://www.nativewind.dev)
- [API Server](../server/README.md)
- [Component Library](../../packages/web-ui/README.md)

---

**Voltig Speed** - Built with Expo and React Native
