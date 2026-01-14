import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Snowflake,
  Sun,
} from "lucide-react-native";

export const weatherCode = {
  0: { type: "Clear sky", icon: Sun },
  1: { type: "Mainly clear", icon: CloudSun },
  2: { type: "Partly cloudy", icon: CloudSun },
  3: { type: "Overcast", icon: Cloud },
  45: { type: "Fog", icon: CloudFog },
  48: { type: "Depositing rime fog", icon: CloudFog },
  51: { type: "Drizzle: Light intensity", icon: CloudDrizzle },
  53: { type: "Drizzle: Moderate intensity", icon: CloudDrizzle },
  55: { type: "Drizzle: Dense intensity", icon: CloudDrizzle },
  56: { type: "Freezing Drizzle: Light intensity", icon: CloudDrizzle },
  57: { type: "Freezing Drizzle: Dense intensity", icon: CloudDrizzle },
  61: { type: "Rain: Slight intensity", icon: CloudRain },
  63: { type: "Rain: Moderate intensity", icon: CloudRain },
  65: { type: "Rain: Heavy intensity", icon: CloudRain },
  66: { type: "Freezing Rain: Light intensity", icon: CloudRain },
  67: { type: "Freezing Rain: Heavy intensity", icon: CloudRain },
  71: { type: "Snow fall: Slight intensity", icon: CloudSnow },
  73: { type: "Snow fall: Moderate intensity", icon: CloudSnow },
  75: { type: "Snow fall: Heavy intensity", icon: CloudSnow },
  77: { type: "Snow grains", icon: Snowflake },
  80: { type: "Rain showers: Slight", icon: CloudRain },
  81: { type: "Rain showers: Moderate", icon: CloudRain },
  82: { type: "Rain showers: Violent", icon: CloudRain },
  85: { type: "Snow showers: Slight", icon: CloudSnow },
  86: { type: "Snow showers: Heavy", icon: CloudSnow },
  95: { type: "Thunderstorm: Slight or moderate", icon: CloudLightning },
  96: { type: "Thunderstorm with slight hail", icon: CloudLightning },
  99: { type: "Thunderstorm with heavy hail", icon: CloudLightning },
};
export type TWeatherCode = keyof typeof weatherCode;

type TCity = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
};

export type TGetCitiesApiResponse = {
  results?: TCity[];
  generationtime_ms: number;
};

type TGetDefaultWeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};

export type TGetCurrentlyWeatherApiResponse = TGetDefaultWeatherApiResponse & {
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: TWeatherCode;
  };
};

export type TGetTodayWeatherApiResponse = TGetDefaultWeatherApiResponse & {
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: TWeatherCode[];
    wind_speed_10m: number[];
  };
};

export type TGetWeeklyWeatherApiResponse = TGetDefaultWeatherApiResponse & {
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weather_code: TWeatherCode[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};
