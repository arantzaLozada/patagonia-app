import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3F5F90',
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Agregar trabajo',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="add-box" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="work-done"
        options={{
          title: 'Trabajos realizados',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="handyman" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="work-submit"
        options={{
          title: 'Trabajos entregados',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="home-repair-service" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
