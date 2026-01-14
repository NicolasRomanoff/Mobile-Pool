import mobileStyles from "@/assets/style";
import ErrorView from "@/components/ErrorView";
import { Typography } from "@/components/Typography";
import ContentView from "@/components/Views/ContentView";
import HeaderView from "@/components/Views/HeaderView";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { getWeatherIcon } from "@/lib/utils";
import {
  weatherCode,
  type TGetCurrentlyWeatherApiResponse,
} from "@/lib/weather.const";
import { Wind } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getCurrentWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
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
          weather: weatherCode[current.weather_code].type,
          windSpeed: current.wind_speed_10m + current_units.wind_speed_10m,
        });
      } catch {
        setError("Failed");
      }
    };
    getCurrentWeather();
  }, [location, setError]);

  if (error) return <ErrorView />;

  const WeatherIcon = getWeatherIcon({ weather: currentWeather?.weather });

  return (
    <SafeAreaView style={mobileStyles.container}>
      <HeaderView />
      <ContentView>
        <Typography size="lg" color="blue">
          {currentWeather?.temperature}
        </Typography>
        <Typography color="white">{currentWeather?.weather}</Typography>
        {WeatherIcon}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Wind color={"#3d7eff"} />
          <Typography size="sm" color="white">
            {currentWeather?.windSpeed}
          </Typography>
        </View>
      </ContentView>
    </SafeAreaView>
  );
};

export default Currently;
