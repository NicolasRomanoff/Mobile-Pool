import style from "@/assets/style";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict, weatherCode } from "@/lib/utils";
import { LucideIcon, Wind } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Currently = () => {
  const { location } = useLocationStore();
  const { error, setError } = useErrorStore();
  const [currentWeather, setCurrentWeather] = useState<{
    temperature: string;
    weather: string;
    windSpeed: string;
  }>();

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,weather_code`
        );
        if (!response.ok) {
          setError({ hasError: true, type: "API Fail" });
          return;
        }
        setError({ hasError: false, type: "undefined" });
        const { current, current_units } = await response.json();
        setCurrentWeather({
          temperature: current.temperature_2m + current_units.temperature_2m,
          weather:
            weatherCode[current.weather_code as keyof typeof weatherCode]
              ?.type || "Undefined",
          windSpeed: current.wind_speed_10m + current_units.wind_speed_10m,
        });
      } catch (e) {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getCurrentWeather();
  }, [location]);

  const getWeatherIcon = () => {
    const weatherInfo = Object.entries(weatherCode).find(
      ([key, value]) => value.type === currentWeather?.weather
    );
    if (!weatherInfo) return undefined;
    return weatherInfo[1].icon;
  };

  const WeatherIcon = getWeatherIcon() as LucideIcon;

  return (
    <SafeAreaView style={style.container}>
      {!error.hasError ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 / 4, justifyContent: "center" }}>
            <Text style={style.tabColoredText}>{location.city}</Text>
            <Text style={style.tabText}>
              {location.region}, {location.country}
            </Text>
          </View>
          <View style={{ flex: 1 / 2, justifyContent: "space-evenly" }}>
            <Text style={[style.tabColoredText, { fontSize: 40 }]}>
              {currentWeather?.temperature}
            </Text>
            <View style={{}}>
              <Text style={style.tabText}>{currentWeather?.weather}</Text>
              <Text style={style.tabColoredText}></Text>
              {WeatherIcon && (
                <WeatherIcon
                  size={"50"}
                  color={"#3d7eff"}
                  style={{ alignSelf: "center" }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Wind color={"#3d7eff"} style={{ marginHorizontal: 10 }} />
              <Text style={style.tabText}>{currentWeather?.windSpeed}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={style.textError}>{errorDict[error.type]}</Text>
      )}
    </SafeAreaView>
  );
};

export default Currently;
