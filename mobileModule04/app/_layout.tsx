import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { Stack } from "expo-router";

const RootLayoutNav = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="profile/index" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
};

export default RootLayout;
