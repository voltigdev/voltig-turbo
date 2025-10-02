import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '@/styles/global.css';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { StatusBar, useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack />
    </>
  );
}
