import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { errorDict, weatherCode } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import useErrorStore from "@/hooks/errorStore";
import { Wind } from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";

const WeatherCard: React.FC<{
  hour: string;
  weather: string;
  temperature: string;
  windSpeed: string;
}> = (data) => {
  const getWeatherIcon = (weather: string) => {
    const weatherInfo = Object.entries(weatherCode).find(
      ([key, value]) => value.type === weather
    );
    if (!weatherInfo) return undefined;
    return weatherInfo[1].icon;
  };

  const WeatherIcon = getWeatherIcon(data.weather);

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        marginHorizontal: 5,
      }}
    >
      <View style={{ flex: 1 / 4 }}>
        <Text style={style.tabText}>{data.hour}</Text>
      </View>
      <View style={{ flex: 1 / 4 }}>
        {WeatherIcon && (
          <WeatherIcon
            size={"30"}
            color={"#3d7eff"}
            style={{ alignSelf: "center" }}
          />
        )}
      </View>
      <View style={{ flex: 1 / 4 }}>
        <Text style={style.tabColoredText}>{data.temperature}</Text>
      </View>
      <View
        style={{ flex: 1 / 4, flexDirection: "row", justifyContent: "center" }}
      >
        <Wind color={"white"} size={20} style={{}} />
        <Text style={style.tabText}>{data.windSpeed}</Text>
      </View>
    </View>
  );
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
  const [chartLength, setChartLength] = useState<{
    width: number;
    height: number;
  }>();
  const chartRef = useRef<View>(null);

  useEffect(() => {
    chartRef.current?.measureInWindow((x, y, width, height) => {
      setChartLength({ width, height });
    });
  }, []);

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
              weatherCode[code as keyof typeof weatherCode]?.type || "Undefined"
          ),
          windSpeed: hourly.wind_speed_10m.map(
            (speed: string) => speed + hourly_units.wind_speed_10m
          ),
        });
      } catch (e) {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getHourlyWeather();
  }, [location]);

  const weatherData:
    | {
        hour: string;
        weather: string;
        temperature: string;
        windSpeed: string;
      }[]
    | undefined = todayWeather?.hour.map((_, i) => {
    return {
      hour: todayWeather.hour[i],
      weather: todayWeather.weather[i],
      temperature: todayWeather.temperature[i],
      windSpeed: todayWeather.windSpeed[i],
    };
  });

  const chartData = {
    labels:
      (todayWeather?.hour.map((hour, index) =>
        index % 3 === 0 ? hour : ""
      ) as string[]) || [],
    datasets: [
      {
        data: (todayWeather?.temperature.map((temperature) =>
          Number(temperature.replace("°C", ""))
        ) as number[]) || [0, 0],
        color: (opacity = 1) => `rgba(190, 150, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={style.container}>
      {!error.hasError ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 / 4, justifyContent: "center" }}>
            <Text style={style.tabColoredText}>{location.city}</Text>
            <Text style={style.tabText}>
              {location.region}
              {location.region && location.country && ", "}
              {location.country}
            </Text>
          </View>
          <View ref={chartRef} style={{ flex: 1 / 2, margin: 10 }}>
            <LineChart
              data={chartData}
              width={(chartLength?.width as number) || 0}
              height={(chartLength?.height as number) || 0}
              yAxisSuffix="°C"
              withShadow={false}
              formatYLabel={(yValue) => Math.round(Number(yValue)).toString()}
              segments={7}
              chartConfig={{
                backgroundGradientFromOpacity: 0.7,
                backgroundGradientToOpacity: 0.7,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
            />
          </View>
          <View style={{ flex: 1 / 4, justifyContent: "center", margin: 2 }}>
            <FlatList
              data={weatherData}
              renderItem={({ item }) => <WeatherCard {...item} />}
              keyExtractor={(item) => item.hour}
              style={{
                backgroundColor: "rgba(190, 150, 0, 0.7)",
                padding: 5,
                borderWidth: 1,
                borderRadius: 30,
              }}
              horizontal
            />
          </View>
        </View>
      ) : (
        <Text style={style.textError}>{errorDict[error.type]}</Text>
      )}
    </SafeAreaView>
  );
};

export default Today;
