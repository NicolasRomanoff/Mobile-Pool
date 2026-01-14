import { blue } from "@/assets/style";
import { weatherCode } from "./weather.const";

const weatherIconSize = {
  lg: 50,
  md: 30,
  sm: 20,
  xs: 15,
};
type TWeatherIconSize = keyof typeof weatherIconSize;

export const getWeatherIcon = ({
  weather,
  size = "lg",
}: {
  weather: string | undefined;
  size?: TWeatherIconSize;
}) => {
  const weatherInfo = Object.values(weatherCode).find(
    (value) => value.type === weather
  );
  if (!weatherInfo) return undefined;
  return (
    <weatherInfo.icon
      size={weatherIconSize[size]}
      color={blue}
      style={{ alignSelf: "center" }}
    />
  );
};
