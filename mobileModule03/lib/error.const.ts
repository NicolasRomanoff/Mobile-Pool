export const errorDict = {
  "": "",
  Failed:
    "The service connection is lost, please check your internet connection or try again later",
  Unauthorized:
    "Geolocation is not available, please enable it in your App settings",
  "Not found":
    "Could not find any result for the supplied address or coordinates",
};
export type TErrorDict = keyof typeof errorDict;
