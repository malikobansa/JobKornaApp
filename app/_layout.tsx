import React from "react";
import { Stack } from "expo-router";
import { QueryProvider } from "@/lib/queryClient";

const Layout: React.FC = () => {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryProvider>
  );
};

export default Layout;
