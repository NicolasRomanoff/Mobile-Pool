import {
  black,
  default as mobileStyles,
  default as myStyle,
} from "@/assets/style";
import { Button } from "@/components/Button";
import Suggestions from "@/components/Suggestions";
import TabBar from "@/components/TabBar";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore, { TLocation } from "@/hooks/locationStore";
import routes from "@/lib/routes.const";
import { TGetCitiesApiResponse } from "@/lib/weather.const";
import { Navigation, Search } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
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

const getCities = async (name: string): Promise<TLocation[] | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=fr&format=json`
    );
    if (!response.ok) return null;

    const citiesData = (await response.json()) as TGetCitiesApiResponse;
    if (!citiesData.results) return [];

    return citiesData.results.map((res) => {
      return {
        city: res.admin2 ?? "",
        region: res.admin1,
        country: res.country,
        latitude: res.latitude,
        longitude: res.longitude,
      };
    });
  } catch {
    return null;
  }
};

const Ex03 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { setLocation } = useLocationStore();
  const { setError } = useErrorStore();
  const [locationTmp, setLocationTmp] = useState("");
  const [suggestions, setSuggestions] = useState<TLocation[]>([]);
  const [coordsSuggestions, setCoordsSuggestions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });
  const citiesRef = useRef<TextInput>(null);

  // const getLocation = async () => {
  //   let { status } = await requestForegroundPermissionsAsync();
  //   if (status === "granted") {
  //     let position = await getLastKnownPositionAsync({});
  //     if (!position) position = await getCurrentPositionAsync({});
  //     const coords = position.coords;
  //     const location = await reverseGeocodeAsync({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //     });
  //     setError("");
  //     setLocation({
  //       city: location[0]?.city,
  //       region: location[0]?.region,
  //       country: location[0]?.country,
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //     });
  //   } else setError("Unauthorized");
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  useEffect(() => {
    citiesRef.current?.measureInWindow((x, y, width, height) => {
      setCoordsSuggestions({ x, y, width, height });
    });
  }, []);

  useEffect(() => {
    const id = setTimeout(async () => {
      const cities = await getCities(locationTmp);
      setSuggestions(cities ?? []);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [locationTmp, setError]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={myStyle.topBar}>
        <Search color={black} size={"30"} style={mobileStyles.icon} />
        <TextInput
          ref={citiesRef}
          style={mobileStyles.input}
          placeholder="Search location ..."
          value={locationTmp}
          onChangeText={setLocationTmp}
          onSubmitEditing={() => {
            if (!locationTmp) return;
            setLocationTmp("");
            setError("");
            if (!suggestions.length) return setError("Not found");
            setLocation(suggestions[0]);
            setSuggestions([]);
          }}
        />
        <Button variant="ghost" onClick={async () => await getLocation()}>
          <Navigation color={black} size={"30"} style={mobileStyles.icon} />
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
      {!!suggestions.length && (
        <Suggestions
          suggestions={suggestions}
          setLocationTmp={setLocationTmp}
          style={[
            mobileStyles.suggestion,
            {
              left: coordsSuggestions.x,
              top: coordsSuggestions.y + coordsSuggestions.height,
              width: coordsSuggestions.width,
              display: "flex",
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
};

export default Ex03;
