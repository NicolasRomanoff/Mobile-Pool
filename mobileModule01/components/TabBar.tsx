import mobileStyles, { black, white } from "@/assets/style";
import { routes } from "@/const/routes.const";
import { Pressable, View } from "react-native";
import { NavigationState, Route } from "react-native-tab-view";
import { Typography } from "./Typography";

const TabBar: React.FC<{
  navigationState: NavigationState<Route>;
  jumpTo: (key: string) => void;
}> = ({ navigationState, jumpTo }) => {
  return (
    <View style={mobileStyles.bottomBar}>
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
              ?.icon(isFocused ? white : black)}
            <Typography color={isFocused ? "white" : "black"} size="sm">
              {route.title}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
