import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <>
      <StatusBar backgroundColor={"black"} />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  );
};

export default RootLayout;
