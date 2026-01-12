import {
  black,
  default as mobileStyles,
  default as myStyle,
} from "@/assets/style";
import { Button } from "@/components/Button";
import Suggestions from "@/components/Suggestions";
import TabBar from "@/components/TabBar";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import routes from "@/lib/routes.const";
import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
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

const Ex03 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { location, setLocation } = useLocationStore();
  const { setError } = useErrorStore();
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
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=fr&format=json`
      );
      if (!response.ok) {
        setError({ hasError: true, type: "API Fail" });
        return;
      }
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
    } catch {
      setError({ hasError: true, type: "API Fail" });
    }
  };

  const getLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      let position = await getLastKnownPositionAsync({});
      if (!position) position = await getCurrentPositionAsync({});
      const coords = position.coords;
      const location = await reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setError({ hasError: false, type: "undefined" });
      setLocation({
        city: location[0]?.city,
        region: location[0]?.region,
        country: location[0]?.country,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } else setError({ hasError: true, type: "Location Access Denied" });
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

  useEffect(() => {
    const id = setTimeout(() => {
      setIsSuggestionSelected(false);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={myStyle.topBar}>
        <Search color={black} size={"30"} style={mobileStyles.icon} />
        <TextInput
          ref={citiesRef}
          style={mobileStyles.input}
          placeholder="Search location ..."
          value={locationTmp}
          onBlur={() => {
            setTimeout(() => {
              if (locationTmp) {
                setError({ hasError: true, type: "Unknown City" });
                setIsSuggestionSelected(false);
                setLocationTmp("");
              }
            }, 100);
          }}
          onChangeText={(e) => {
            setLocationTmp(e);
            setIsSuggestionSelected(true);
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
      {isSuggestionSelected && (
        <Suggestions
          suggestions={suggestions}
          setLocationTmp={setLocationTmp}
          setIsSuggestionSelected={setIsSuggestionSelected}
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
