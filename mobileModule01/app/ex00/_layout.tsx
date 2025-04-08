import { Stack } from "expo-router";

const Ex00Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"></Stack.Screen>
    </Stack>
  );
};

export default Ex00Layout;
