import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
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

export const errorDict = {
  undefined: "",
  "Location Access Denied":
    "Geolocation is not available, please enable it in your App settings",
  "Unknown City":
    "Could not find any result for the supplied address or coordinates",
  "API Fail":
    "The service connection is lost, please check your internet connection or try again later",
};
