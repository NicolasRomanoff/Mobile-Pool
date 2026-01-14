import { blue } from "@/assets/style";
import { getWeatherIcon } from "@/lib/utils";
import { Wind } from "lucide-react-native";
import { View } from "react-native";
import { Typography } from "./Typography";

export const TodayWeatherCard: React.FC<{
  hour: string;
  weather: string;
  temperature: string;
  windSpeed: string;
}> = ({ hour, weather, temperature, windSpeed }) => {
  const WeatherIcon = getWeatherIcon({ weather });

  return (
    <View style={{ margin: 5, width: 80 }}>
      <Typography size="sm" color="white">
        {hour}
      </Typography>
      {WeatherIcon}
      <Typography size="sm">{temperature}</Typography>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Wind color={blue} size={20} />
        <Typography size="sm" color="white">
          {windSpeed}
        </Typography>
      </View>
    </View>
  );
};

export const WeeklyWeatherCard: React.FC<{
  date: string;
  weather: string;
  minTemperature: string;
  maxTemperature: string;
}> = ({ date, weather, minTemperature, maxTemperature }) => {
  const WeatherIcon = getWeatherIcon({ weather });

  return (
    <View style={{ margin: 5, width: 80 }}>
      <Typography size="sm" color="white">
        {date.slice(date.length - 5, date.length)}
      </Typography>
      {WeatherIcon}
      <Typography size="sm" color="red">
        {maxTemperature}
      </Typography>
      <Typography size="sm" color="blue">
        {minTemperature}
      </Typography>
    </View>
  );
};
