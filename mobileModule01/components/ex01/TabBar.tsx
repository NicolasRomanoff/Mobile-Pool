import { black, white, yellow } from "@/assets/style";
import { routes } from "@/const/routes.const";
import { Pressable, View } from "react-native";
import { NavigationState, Route } from "react-native-tab-view";
import { Typography } from "../Typography";

const TabBar: React.FC<{
  navigationState: NavigationState<Route>;
  jumpTo: (key: string) => void;
}> = ({ navigationState, jumpTo }) => {
  return (
    <View style={{ flexDirection: "row", backgroundColor: white }}>
      {navigationState.routes.map((route, index) => {
        const isFocused = navigationState.index === index;
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
            {routes
              .find(({ key }) => key === route.key)
              ?.icon(isFocused ? yellow : black)}
            <Typography color={isFocused ? "yellow" : "black"} size="sm">
              {route.title}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
