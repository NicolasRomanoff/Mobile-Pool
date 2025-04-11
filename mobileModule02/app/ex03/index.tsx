import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
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
import myStyle from "@/assets/style";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import useLocationStore from "@/hooks/locationStore";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import useErrorStore from "@/hooks/errorStore";

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

const Suggestions: React.FC<
  {
    suggestions: {
      city: string;
      region: string;
      country: string;
      latitude: number;
      longitude: number;
    }[];
    setLocationTmp: React.Dispatch<React.SetStateAction<string>>;
    setIsSuggestionSelected: React.Dispatch<React.SetStateAction<boolean>>;
  } & ComponentProps<typeof View>
> = ({
  suggestions,
  setLocationTmp,
  setIsSuggestionSelected,
  style,
  ...props
}) => {
  const { setLocation } = useLocationStore();
  const { setError } = useErrorStore();
  return (
    <View style={style} {...props}>
      {!suggestions.length && <Text style={myStyle.grayText}>No data ...</Text>}
      {suggestions.map((sug, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 5,
              margin: 1,
            }}
            onPress={() => {
              setError({ hasError: false, type: "undefined" });
              setLocation({ ...sug });
              setLocationTmp("");
              setIsSuggestionSelected(false);
            }}
          >
            <Text style={myStyle.suggestionText}>
              {Object.entries(sug)
                .filter(
                  ([key, value]) =>
                    ["city", "region", "country"].includes(key) && value
                )
                .map(([key, value], index) => (
                  <Text key={index} style={{ color: index ? "gray" : "black" }}>
                    {(index ? ", " : "") + value}
                  </Text>
                ))}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
      setError({ hasError: false, type: "undefined" });
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
    } catch (e) {
      setError({ hasError: true, type: "API Fail" });
    }
  };

  const getLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      let { coords } = await getCurrentPositionAsync({});
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
            if (locationTmp) {
              setError({ hasError: true, type: "Unknown City" });
              setIsSuggestionSelected(false);
              setLocationTmp("");
            }
          }}
          onChangeText={(e) => {
            setLocationTmp(e);
            setIsSuggestionSelected(true);
          }}
        />
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
    </SafeAreaView>
  );
};

export default Ex03;
