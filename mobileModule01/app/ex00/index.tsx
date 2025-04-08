import * as React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import {
  TabView,
  SceneMap,
  NavigationState,
  Route,
} from "react-native-tab-view";
import { Calendar, CalendarDays, Sun } from "lucide-react-native";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";

const renderScene = SceneMap({
  currently: Currently,
  today: Today,
  weekly: Weekly,
});

const routes = [
  { key: "currently", title: "Currently" },
  { key: "today", title: "Today" },
  { key: "weekly", title: "Weekly" },
];

const MyTabBar: React.FC<{
  navigationState: NavigationState<Route>;
  jumpTo: (key: string) => void;
}> = ({ navigationState, jumpTo }) => {
  return (
    <View style={{ flexDirection: "row", backgroundColor: "white" }}>
      {navigationState.routes.map((route, index) => {
        const isFocused = navigationState.index === index;
        const color = isFocused ? "orange" : "gray";

        const renderIcon = () => {
          switch (route.key) {
            case "currently":
              return <Sun color={color} size={24} />;
            case "today":
              return <Calendar color={color} size={24} />;
            case "weekly":
              return <CalendarDays color={color} size={24} />;
            default:
              return null;
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 10,
            }}
          >
            {renderIcon()}
            <Text style={{ color, marginTop: 4 }}>{route.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const Ex00 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={"bottom"}
      renderTabBar={(props) => <MyTabBar {...props} />}
    />
  );
};

export default Ex00;
