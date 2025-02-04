import React from "react";
import { Stack } from "expo-router";
import { Animated } from "react-native";

const Layout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
