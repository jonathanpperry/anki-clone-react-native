import React from "react";
import { Stack, Tabs, useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
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
      <Stack.Screen name="(learn)/[id]" options={{ title: 'Learn' }} />

      <Stack.Screen
        name="(modals)/set/[id]"
        options={{
          presentation: "modal",
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={24} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(modals)/set/create"
        options={{
          presentation: "modal",
          title: "Create Card Set",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={24} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(modals)/(cards)/[id]"
        options={{
          presentation: "modal",
          title: "Update Set Cards",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={24} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
