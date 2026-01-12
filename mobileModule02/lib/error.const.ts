export const errorDict = {
  undefined: "",
  "Location Access Denied":
    "Geolocation is not available, please enable it in your App settings",
  "Unknown City":
    "Could not find any result for the supplied address or coordinates",
  "API Fail":
    "The service connection is lost, please check your internet connection or try again later",
};
export type TErrorDict = keyof typeof errorDict;
