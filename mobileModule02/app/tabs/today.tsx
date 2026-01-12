import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import { weatherCode } from "@/lib/weather.const";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const getHourlyWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`
        );
        if (!response.ok) {
          setError({ hasError: true, type: "API Fail" });
          return;
        }
        setError({ hasError: false, type: "undefined" });
        const { hourly, hourly_units } = await response.json();
        setTodayWeather({
          hour: hourly.time.map((time: string) => {
            return format(new Date(time), "HH:mm");
          }),
          temperature: hourly.temperature_2m.map(
            (temp: string) => temp + hourly_units.temperature_2m
          ),
          weather: hourly.weather_code.map(
            (code: number) =>
              weatherCode[code as keyof typeof weatherCode] || "Undefined"
          ),
          windSpeed: hourly.wind_speed_10m.map(
            (speed: string) => speed + hourly_units.wind_speed_10m
          ),
        });
      } catch {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getHourlyWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={style.container}>
      {!error.hasError ? (
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
          {errorDict[error.type]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Today;
