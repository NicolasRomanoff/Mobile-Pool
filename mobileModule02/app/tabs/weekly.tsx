import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict } from "@/lib/error.const";
import { TGetWeeklyWeatherApiResponse, weatherCode } from "@/lib/weather.const";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getWeeklyWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`;
};

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
      if (!location.longitude || !location.latitude) return;
      try {
        const response = await fetch(getWeeklyWeatherUrl(location));
        if (!response.ok) {
          setError("Failed");
          return;
        }
        setError("");
        const { daily, daily_units } =
          (await response.json()) as TGetWeeklyWeatherApiResponse;
        setWeeklyWeather({
          date: daily.time,
          minTemperature: daily.temperature_2m_min.map(
            (minTemp) => minTemp + daily_units.temperature_2m_min,
          ),
          maxTemperature: daily.temperature_2m_max.map(
            (maxTemp) => maxTemp + daily_units.temperature_2m_max,
          ),
          weather: daily.weather_code.map((code) => weatherCode[code]),
        });
      } catch {
        setError("Failed");
      }
    };
    getWeeklyWeather();
  }, [location, setError]);

  return (
    <SafeAreaView style={style.container}>
      {!error ? (
        <View>
          <Typography size="sm">{location.city}</Typography>
          <Typography size="sm">{location.region}</Typography>
          <Typography size="sm">{location.country}</Typography>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.date.map((day, index) => (
                <Typography key={index} size="xs">
                  {day}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.minTemperature.map((minTemp, index) => (
                <Typography key={index} size="xs">
                  {minTemp}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.maxTemperature.map((maxTemp, index) => (
                <Typography key={index} size="xs">
                  {maxTemp}
                </Typography>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.weather.map((weat, index) => (
                <Typography key={index} size="xs">
                  {weat}
                </Typography>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Typography color="red" size="sm">
          {errorDict[error]}
        </Typography>
      )}
    </SafeAreaView>
  );
};

export default Weekly;
