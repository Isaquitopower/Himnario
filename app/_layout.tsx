import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/theme/ThemeContext';
import { FontSizeProvider } from '@/context/FontSizeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </FontSizeProvider>
    </ThemeProvider>
  );
}
