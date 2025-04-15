import style from "@/assets/style";
import useErrorStore from "@/hooks/errorStore";
import useLocationStore from "@/hooks/locationStore";
import { errorDict, weatherCode } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const WeatherCard: React.FC<{
  date: string;
  minTemperature: string;
  maxTemperature: string;
  weather: string;
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
        <Text style={style.tabText}>
          {data.date.slice(data.date.length - 5, data.date.length)}
        </Text>
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
        <Text style={[style.tabText, { color: "red" }]}>
          {data.maxTemperature}
        </Text>
      </View>
      <View style={{ flex: 1 / 4 }}>
        <Text style={[style.tabText, { color: "cyan" }]}>
          {data.minTemperature}
        </Text>
      </View>
    </View>
  );
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
  const [chartLength, setChartLength] = useState<{
    width: number;
    height: number;
  }>();
  const chartRef = useRef<View>(null);

  useEffect(() => {
    const handleChange = () => {
      chartRef.current?.measureInWindow((x, y, width, height) => {
        setChartLength({ width, height });
      });
    };

    handleChange();
    const subscription = Dimensions.addEventListener("change", handleChange);
    return () => subscription?.remove();
  }, []);

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
              weatherCode[code as keyof typeof weatherCode]?.type || "Undefined"
          ),
        });
      } catch (e) {
        setError({ hasError: true, type: "API Fail" });
      }
    };
    getWeeklyWeather();
  }, [location]);

  const weatherData:
    | {
        date: string;
        weather: string;
        maxTemperature: string;
        minTemperature: string;
      }[]
    | undefined = weeklyWeather?.date.map((_, i) => {
    return {
      date: weeklyWeather.date[i],
      weather: weeklyWeather.weather[i],
      maxTemperature: weeklyWeather.maxTemperature[i],
      minTemperature: weeklyWeather.minTemperature[i],
    };
  });

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
              width={chartLength?.width || 0}
              height={chartLength?.height || 0}
              yAxisSuffix="°C"
              withShadow={false}
              formatYLabel={(yValue) => Number(yValue).toFixed(1).toString()}
              segments={5}
              withVerticalLines={false}
              chartConfig={{
                backgroundGradientFromOpacity: 0.7,
                backgroundGradientToOpacity: 0.7,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
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
              <Text style={{ color: "cyan" }}>-o- Min temperature</Text>
              <Text style={{ color: "red" }}>-o- Max temperature</Text>
            </View>
          </View>
          <View style={{ flex: 1 / 4, justifyContent: "center", margin: 2 }}>
            <FlatList
              data={weatherData}
              renderItem={({ item }) => <WeatherCard {...item} />}
              keyExtractor={(item) => item.date}
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

export default Weekly;
