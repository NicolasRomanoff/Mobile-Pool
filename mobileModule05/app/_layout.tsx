import { FirebaseProvider, useFirebase } from "@/components/FirebaseProvider";
import { Stack } from "expo-router";

const RootLayoutNav = () => {
  const { user, isLoading } = useFirebase();

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
    <FirebaseProvider>
      <RootLayoutNav />
    </FirebaseProvider>
  );
};

export default RootLayout;
