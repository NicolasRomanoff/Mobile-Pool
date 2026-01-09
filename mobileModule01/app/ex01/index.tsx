import { black, white, yellow } from "@/assets/style";
import { Button } from "@/components/Button";
import TabBar from "@/components/ex01/TabBar";
import { routes } from "@/const/routes.const";
import useLocationStore from "@/hooks/locationStore";
import { Navigation, Search } from "lucide-react-native";
import { useState } from "react";
import { TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";

const renderScene = SceneMap({
  currently: Currently,
  today: Today,
  weekly: Weekly,
});

const Ex01 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { setLocation } = useLocationStore();
  const [locationTmp, setLocationTmp] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 70,
          backgroundColor: yellow,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <Search
          color={black}
          size={"30"}
          style={{
            alignSelf: "center",
          }}
        />
        <TextInput
          style={{
            flex: 1,
            fontSize: 20,
            color: white,
            borderColor: black,
            borderRadius: 10,
            borderWidth: 2,
            margin: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Search location ..."
          onBlur={() => setLocation(locationTmp)}
          onChangeText={setLocationTmp}
        />
        <Button onClick={() => setLocation("Geolocation")}>
          <Navigation
            color={black}
            size={"30"}
            style={{
              alignSelf: "center",
            }}
          />
        </Button>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition={"bottom"}
        renderTabBar={(props) => <TabBar {...props} />}
      />
    </SafeAreaView>
  );
};

export default Ex01;
