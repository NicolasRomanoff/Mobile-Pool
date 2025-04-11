import style from "@/assets/style";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict, weatherCode } from "@/lib/utils";
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
            weatherCode[current.weather_code as keyof typeof weatherCode] ||
            "Undefined",
          windSpeed: current.wind_speed_10m + current_units.wind_speed_10m,
        });
      } catch (e) {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getCurrentWeather();
  }, [location]);

  return (
    <SafeAreaView style={style.container}>
      {!error.hasError ? (
        <View>
          <Text style={style.text}>{location.city}</Text>
          <Text style={style.text}>{location.region}</Text>
          <Text style={style.text}>{location.country}</Text>
          <Text style={style.text}>{currentWeather?.temperature}</Text>
          <Text style={style.text}>{currentWeather?.weather}</Text>
          <Text style={style.text}>{currentWeather?.windSpeed}</Text>
        </View>
      ) : (
        <Text style={style.textError}>{errorDict[error.type]}</Text>
      )}
    </SafeAreaView>
  );
};

export default Currently;
