import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#3F5F90',
    surfaceTint: '#3F5F90',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D6E3FF',
    onPrimaryContainer: '#254777',
    secondary: '#555F71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D9E3F8',
    onSecondaryContainer: '#3E4758',
    tertiary: '#6F5675',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#F8D8FE',
    onTertiaryContainer: '#563E5D',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',
    background: '#F9F9FF',
    onBackground: '#191C20',
    surface: '#F9F9FF',
    onSurface: '#191C20',
    surfaceVariant: '#E0E2EC',
    onSurfaceVariant: '#43474E',
    outline: '#74777F',
    outlineVariant: '#C4C6CF',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2E3035',
    inverseOnSurface: '#F0F0F7',
    inversePrimary: '#A8C8FF',
    primaryFixed: '#D6E3FF',
    onPrimaryFixed: '#001B3C',
    primaryFixedDim: '#A8C8FF',
    onPrimaryFixedVariant: '#254777',
    secondaryFixed: '#D9E3F8',
    onSecondaryFixed: '#121C2B',
    secondaryFixedDim: '#BDC7DC',
    onSecondaryFixedVariant: '#3E4758',
    tertiaryFixed: '#F8D8FE',
    onTertiaryFixed: '#28132F',
    tertiaryFixedDim: '#DBBCE1',
    onTertiaryFixedVariant: '#563E5D',
    surfaceDim: '#D9D9E0',
    surfaceBright: '#F9F9FF',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F3F3FA',
    surfaceContainer: '#EDEDF4',
    surfaceContainerHigh: '#E7E8EE',
    surfaceContainerHighest: '#E1E2E9',
  }, // Copy it from the color codes scheme and then use it here
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack>
      </PaperProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
