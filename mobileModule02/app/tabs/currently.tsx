import { default as mobileStyles, default as style } from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import type { TWeatherCode } from "@/lib/weather.const";
import { weatherCode } from "@/lib/weather.const";
import { useEffect, useState } from "react";
import { View } from "react-native";
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
            weatherCode[current.weather_code as TWeatherCode] || "Undefined",
          windSpeed: current.wind_speed_10m + current_units.wind_speed_10m,
        });
      } catch {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getCurrentWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={mobileStyles.container}>
      {!error.hasError ? (
        <View>
          <Typography size="sm">{location.city}</Typography>
          <Typography size="sm" style={style.text}>
            {location.region}
          </Typography>
          <Typography size="sm" style={style.text}>
            {location.country}
          </Typography>
          <Typography size="sm" style={style.text}>
            {currentWeather?.temperature}
          </Typography>
          <Typography size="sm" style={style.text}>
            {currentWeather?.weather}
          </Typography>
          <Typography size="sm" style={style.text}>
            {currentWeather?.windSpeed}
          </Typography>
        </View>
      ) : (
        <Typography color="red" size="sm">
          {errorDict[error.type]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Currently;
