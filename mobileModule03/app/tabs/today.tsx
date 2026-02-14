import style from "@/assets/style";
import ErrorView from "@/components/ErrorView";
import ScrollSafeFlatList from "@/components/ScrollSafeFlatList";
import ContentView from "@/components/Views/ContentView";
import FooterView from "@/components/Views/FooterView";
import HeaderView from "@/components/Views/HeaderView";
import { TodayWeatherCard } from "@/components/WeatherCards";
import WeatherChart from "@/components/WeatherChart";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { TGetTodayWeatherApiResponse, weatherCode } from "@/lib/weather.const";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LayoutRectangle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getTodayWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
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
  const [chartLength, setChartLength] = useState<LayoutRectangle>();

  useEffect(() => {
    const getTodayWeather = async () => {
      if (!location.longitude || !location.latitude) return;
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
            (temp) => temp + hourly_units.temperature_2m,
          ),
          weather: hourly.weather_code.map((code) => weatherCode[code].type),
          windSpeed: hourly.wind_speed_10m.map(
            (speed) => speed + hourly_units.wind_speed_10m,
          ),
        });
      } catch {
        setError("Failed");
      }
    };
    getTodayWeather();
  }, [location, setError]);

  if (error) return <ErrorView />;

  const weatherData = todayWeather?.hour.map((_, i) => ({
    hour: todayWeather.hour[i],
    weather: todayWeather.weather[i],
    temperature: todayWeather.temperature[i],
    windSpeed: todayWeather.windSpeed[i],
  }));

  const chartData = {
    labels:
      todayWeather?.hour.map((hour, index) => (index % 3 === 0 ? hour : "")) ||
      [],
    datasets: [
      {
        data: todayWeather?.temperature.map((temperature) =>
          Number(temperature.replace("°C", "")),
        ) || [0, 0],
        color: (opacity = 1) => `rgba(190, 150, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={style.container}>
      <HeaderView />
      <ContentView onLayout={(e) => setChartLength(e.nativeEvent.layout)}>
        <WeatherChart
          chartData={chartData}
          width={chartLength?.width ?? 0}
          height={chartLength?.height ?? 0}
        />
      </ContentView>
      <FooterView>
        <ScrollSafeFlatList
          data={weatherData}
          renderItem={({ item }) => <TodayWeatherCard {...item} />}
          keyExtractor={(item) => item.hour}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 5,
            flex: 1,
          }}
          horizontal
        />
      </FooterView>
    </SafeAreaView>
  );
};

export default Today;
