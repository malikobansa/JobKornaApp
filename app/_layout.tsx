import React from 'react';
import { Stack } from "expo-router";
import { Animated } from "react-native";

const Layout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Slide effect
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
