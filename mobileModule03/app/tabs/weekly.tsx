import style from "@/assets/style";
import ErrorView from "@/components/ErrorView";
import { Typography } from "@/components/Typography";
import ContentView from "@/components/Views/ContentView";
import FooterView from "@/components/Views/FooterView";
import HeaderView from "@/components/Views/HeaderView";
import { WeeklyWeatherCard } from "@/components/WeatherCards";
import WeatherChart from "@/components/WeatherChart";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { TGetWeeklyWeatherApiResponse, weatherCode } from "@/lib/weather.const";
import { useEffect, useState } from "react";
import { FlatList, LayoutRectangle, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getWeeklyWeatherUrl = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
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
  const [chartLength, setChartLength] = useState<LayoutRectangle>();

  useEffect(() => {
    const getWeeklyWeather = async () => {
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
            (minTemp) => minTemp + daily_units.temperature_2m_min
          ),
          maxTemperature: daily.temperature_2m_max.map(
            (maxTemp) => maxTemp + daily_units.temperature_2m_max
          ),
          weather: daily.weather_code.map((code) => weatherCode[code].type),
        });
      } catch {
        setError("Failed");
      }
    };
    getWeeklyWeather();
  }, [location, setError]);

  if (error) return <ErrorView />;

  const weatherData = weeklyWeather?.date.map((_, i) => ({
    date: weeklyWeather.date[i],
    weather: weeklyWeather.weather[i],
    maxTemperature: weeklyWeather.maxTemperature[i],
    minTemperature: weeklyWeather.minTemperature[i],
  }));

  const chartData = {
    labels:
      weeklyWeather?.date.map((date) =>
        date.slice(date.length - 5, date.length)
      ) || [],
    datasets: [
      {
        data: weeklyWeather?.maxTemperature.map((temperature) =>
          Number(temperature.replace("°C", ""))
        ) || [0, 0],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: (weeklyWeather?.minTemperature.map((temperature) =>
          Number(temperature.replace("°C", ""))
        ) as number[]) || [0, 0],
        color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
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
        <View
          style={{
            position: "absolute",
            width: chartLength?.width,
            height: chartLength?.height,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            padding: 5,
          }}
        >
          <Typography size="xs" color="blue">
            -o- Min temperature
          </Typography>
          <Typography size="xs" color="red">
            -o- Max temperature
          </Typography>
        </View>
      </ContentView>
      <FooterView>
        <FlatList
          data={weatherData}
          renderItem={({ item }) => <WeeklyWeatherCard {...item} />}
          keyExtractor={(item) => item.date}
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

export default Weekly;
