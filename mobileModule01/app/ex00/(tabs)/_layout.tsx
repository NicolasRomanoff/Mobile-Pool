import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TabLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="currently"
          options={{ title: "Currently" }}
        ></Tabs.Screen>
        <Tabs.Screen name="today" options={{ title: "Today" }}></Tabs.Screen>
        <Tabs.Screen name="weekly" options={{ title: "Weekly" }}></Tabs.Screen>
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
