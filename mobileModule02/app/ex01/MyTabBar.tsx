import { Calendar, CalendarDays, Sun } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { NavigationState, Route } from "react-native-tab-view";

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

export default MyTabBar;
