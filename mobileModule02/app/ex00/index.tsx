import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  TabView,
  SceneMap,
  NavigationState,
  Route,
} from "react-native-tab-view";
import {
  Calendar,
  CalendarDays,
  Navigation,
  Search,
  Sun,
} from "lucide-react-native";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";
import { useEffect, useState } from "react";
import useLocationStore from "@/hooks/locationStore";
import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

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
  const [index, setIndex] = useState(0);
  const { location, setLocation, setFinded } = useLocationStore();
  const [locationTmp, setLocationTmp] = useState("");

  const getLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      setFinded(true);
      let position = await getLastKnownPositionAsync({});
      if (!position) position = await getCurrentPositionAsync({});
      const coords = position.coords;
      setLocation({
        city: "",
        region: "",
        country: "",
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 70,
          backgroundColor: "orange",
          display: "flex",
          flexDirection: "row",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <Search
          color={"black"}
          size={"30"}
          style={{
            alignSelf: "center",
          }}
        />
        <TextInput
          style={{
            flex: 1,
            fontSize: 20,
            color: "white",
            borderColor: "black",
            borderRadius: 10,
            borderWidth: 2,
            margin: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Search location ..."
          onBlur={() =>
            setLocation({
              city: locationTmp,
              region: "",
              country: "",
              latitude: location.latitude,
              longitude: location.longitude,
            })
          }
          onChangeText={setLocationTmp}
        ></TextInput>
        <Navigation
          color={"black"}
          size={"30"}
          style={{
            alignSelf: "center",
          }}
          onPress={async () => await getLocation()}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition={"bottom"}
        renderTabBar={(props) => <MyTabBar {...props} />}
      />
    </SafeAreaView>
  );
};

export default Ex00;
