import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import { weatherCode } from "@/lib/weather.const";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Weekly = () => {
  const { location } = useLocationStore();
  const { error, setError } = useErrorStore();
  const [weeklyWeather, setWeeklyWeather] = useState<{
    date: string[];
    minTemperature: string[];
    maxTemperature: string[];
    weather: string[];
  }>();

  useEffect(() => {
    const getWeeklyWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`
        );
        if (!response.ok) {
          setError({ hasError: true, type: "API Fail" });
          return;
        }
        setError({ hasError: false, type: "undefined" });
        const { daily, daily_units } = await response.json();
        setWeeklyWeather({
          date: daily.time,
          minTemperature: daily.temperature_2m_min.map(
            (minTemp: string) => minTemp + daily_units.temperature_2m_min
          ),
          maxTemperature: daily.temperature_2m_max.map(
            (maxTemp: string) => maxTemp + daily_units.temperature_2m_max
          ),
          weather: daily.weather_code.map(
            (code: number) =>
              weatherCode[code as keyof typeof weatherCode] || "Undefined"
          ),
        });
      } catch {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getWeeklyWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={style.container}>
      {!error.hasError ? (
        <View>
          <Typography size="sm">{location.city}</Typography>
          <Typography size="sm">{location.region}</Typography>
          <Typography size="sm">{location.country}</Typography>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.date.map((day, index) => (
                <Typography key={index} size="sm">
                  {day}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.minTemperature.map((minTemp, index) => (
                <Typography key={index} size="sm">
                  {minTemp}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.maxTemperature.map((maxTemp, index) => (
                <Typography key={index} size="sm">
                  {maxTemp}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.weather.map((weat, index) => (
                <Typography key={index} size="sm">
                  {weat}
                </Typography>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Typography color="red" size="sm">
          {errorDict[error.type]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Weekly;
