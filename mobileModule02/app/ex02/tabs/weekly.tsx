import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { weatherCode } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Weekly = () => {
  const { location, finded } = useLocationStore();
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
        if (!response.ok) return;
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
      } catch {}
    };
    getWeeklyWeather();
  }, [location]);

  return (
    <SafeAreaView style={style.container}>
      {finded ? (
        <View>
          <Text style={style.text}>{location.city}</Text>
          <Text style={style.text}>{location.region}</Text>
          <Text style={style.text}>{location.country}</Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.date.map((day, index) => (
                <Text key={index}>{day}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.minTemperature.map((minTemp, index) => (
                <Text key={index}>{minTemp}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.maxTemperature.map((maxTemp, index) => (
                <Text key={index}>{maxTemp}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {weeklyWeather?.weather.map((weat, index) => (
                <Text key={index}>{weat}</Text>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Text style={style.textError}>
          Geolocation is not available, please enable it in your App settings
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Weekly;
