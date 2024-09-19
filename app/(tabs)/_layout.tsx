import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSession } from "@/components/AuthProvider";
import { ThemedText } from "@/components/theme/ThemedText";
import { colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const colors = useThemeColor();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text.base,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "code-slash" : "code-slash-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
