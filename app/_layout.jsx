import { Stack } from "expo-router";
import { Animated } from "react-native";

export default function Layout() {
  return (
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
  );
}
