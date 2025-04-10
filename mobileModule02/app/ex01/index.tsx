import {
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Navigation, Search } from "lucide-react-native";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";
import myStyle from "@/assets/style";
import React, { useEffect, useRef, useState } from "react";
import useLocationStore from "@/hooks/locationStore";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import Suggestions from "./Suggestions";
import MyTabBar from "./MyTabBar";

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

const Ex01 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { setLocation, setLocationName, setFinded } = useLocationStore();
  const [locationTmp, setLocationTmp] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [coordsSuggestions, setCoordsSuggestions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });
  const citiesRef = useRef<TextInput>(null);

  const fetchCity = async (name: string) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=fr&format=json`
    );
    if (response.status !== 200) return;
    const citiesData = await response.json();
    if (!citiesData.results) {
      setSuggestions([]);
      return;
    }
    const suggestions = citiesData.results.map(
      (res: {
        admin1: string;
        admin2: string;
        country: string;
        latitude: number;
        longitude: number;
      }) => {
        return {
          city: res.admin2,
          region: res.admin1,
          country: res.country,
          latitude: res.latitude,
          longitude: res.longitude,
        };
      }
    );
    setSuggestions(suggestions);
  };

  const getLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      setFinded(true);
      let { coords } = await getCurrentPositionAsync({});
      setLocation({
        name: "Your localisation",
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    citiesRef.current?.measureInWindow((x, y, width, height) => {
      setCoordsSuggestions({ x, y, width, height });
    });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchCity(locationTmp);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [locationTmp]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={myStyle.topBar}>
        <Search
          color={"black"}
          size={"30"}
          style={{
            alignSelf: "center",
          }}
        />
        <TextInput
          ref={citiesRef}
          style={myStyle.searchBar}
          placeholder="Search location ..."
          value={locationTmp}
          onBlur={() => {
            if (locationTmp) setLocationName({ name: locationTmp });
            setIsSuggestionSelected(false);
          }}
          onChangeText={(e) => {
            setLocationTmp(e);
            setIsSuggestionSelected(true);
          }}
        />
        {isSuggestionSelected && (
          <Suggestions
            suggestions={suggestions}
            setLocationTmp={setLocationTmp}
            setIsSuggestionSelected={setIsSuggestionSelected}
            style={[
              myStyle.suggestion,
              {
                left: coordsSuggestions.x,
                top: coordsSuggestions.y + coordsSuggestions.height,
                width: coordsSuggestions.width,
                display: "flex",
              },
            ]}
          />
        )}
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

export default Ex01;
