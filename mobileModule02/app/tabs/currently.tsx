import { default as mobileStyles, default as style } from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import {
  weatherCode,
  type TGetCurrentlyWeatherApiResponse,
} from "@/lib/weather.const";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getCurrentWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`;
};

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
      if (!location.longitude || !location.latitude) return;
      try {
        const response = await fetch(getCurrentWeatherUrl(location));
        if (!response.ok) {
          setError("Failed");
          return;
        }
        setError("");
        const { current, current_units } =
          (await response.json()) as TGetCurrentlyWeatherApiResponse;
        setCurrentWeather({
          temperature: current.temperature_2m + current_units.temperature_2m,
          weather: weatherCode[current.weather_code],
          windSpeed: current.wind_speed_10m + current_units.wind_speed_10m,
        });
      } catch {
        setError("Failed");
      }
    };
    getCurrentWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={mobileStyles.container}>
      {!error ? (
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
          {errorDict[error]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Currently;
