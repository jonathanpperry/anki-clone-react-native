import React from "react";
import { Stack, Tabs } from "expo-router";
import Colors from "../constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/set/[id]"
        options={{ presentation: "modal", title: "" }}
      />
    </Stack>
  );
};

export default Layout;
