import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { weatherCode } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";

const Today = () => {
  const { location, finded } = useLocationStore();
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
        if (!response.ok) return;
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
      } catch {}
    };
    getHourlyWeather();
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
              {todayWeather?.hour.map((hour, index) => (
                <Text key={index}>{hour}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.temperature.map((temp, index) => (
                <Text key={index}>{temp}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.weather.map((weat, index) => (
                <Text key={index}>{weat}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              {todayWeather?.windSpeed.map((wind, index) => (
                <Text key={index}>{wind}</Text>
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

export default Today;
