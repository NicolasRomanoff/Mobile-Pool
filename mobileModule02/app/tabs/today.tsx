import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import { TGetTodayWeatherApiResponse, weatherCode } from "@/lib/weather.const";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getTodayWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`;
};

const Today = () => {
  const { location } = useLocationStore();
  const { error, setError } = useErrorStore();
  const [todayWeather, setTodayWeather] = useState<{
    hour: string[];
    temperature: string[];
    weather: string[];
    windSpeed: string[];
  }>();

  useEffect(() => {
    const getTodayWeather = async () => {
      try {
        const response = await fetch(getTodayWeatherUrl(location));
        if (!response.ok) {
          setError("Failed");
          return;
        }
        setError("");
        const { hourly, hourly_units } =
          (await response.json()) as TGetTodayWeatherApiResponse;
        setTodayWeather({
          hour: hourly.time.map((time: string) => {
            return format(new Date(time), "HH:mm");
          }),
          temperature: hourly.temperature_2m.map(
            (temp) => temp + hourly_units.temperature_2m
          ),
          weather: hourly.weather_code.map((code) => weatherCode[code]),
          windSpeed: hourly.wind_speed_10m.map(
            (speed) => speed + hourly_units.wind_speed_10m
          ),
        });
      } catch {
        setError("Failed");
      }
    };
    getTodayWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={style.container}>
      {!error ? (
        <ScrollView>
          <Typography size="sm">{location.city}</Typography>
          <Typography size="sm">{location.region}</Typography>
          <Typography size="sm">{location.country}</Typography>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.hour.map((hour, index) => (
                <Typography key={index} size="sm">
                  {hour}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.temperature.map((temp, index) => (
                <Typography key={index} size="sm">
                  {temp}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.weather.map((weat, index) => (
                <Typography key={index} size="sm">
                  {weat}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.windSpeed.map((wind, index) => (
                <Typography key={index} size="sm">
                  {wind}
                </Typography>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <Typography color="red" size="sm">
          {errorDict[error]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Today;
