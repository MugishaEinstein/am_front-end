import { Stack } from 'expo-router';
import React from 'react';
import "../../global.css";
import { TranslationProvider } from '@/context/languageContext';

export default function TabLayout() {
  return (
    <TranslationProvider>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="registration" options={{ title: 'registration' }} />
      <Stack.Screen name="ShareableLinks" options={{ title: 'ShareableLinks' }} />
    </Stack>
    </TranslationProvider>
  );
}
