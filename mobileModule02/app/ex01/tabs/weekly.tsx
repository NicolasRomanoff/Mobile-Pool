import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Weekly = () => {
  const { location, finded } = useLocationStore();

  return (
    <SafeAreaView style={style.container}>
      {finded ? (
        <View>
          <Text style={style.text}>Weekly</Text>
          <Text style={style.text}>
            {Object.entries(location)
              .filter(
                ([key, value]) =>
                  ["city", "region", "country"].includes(key) && value
              )
              .map(([key, value]) => value)
              .join(", ")}
          </Text>
          <Text style={style.text}>
            {location.latitude} {location.longitude}
          </Text>
        </View>
      ) : (
        <Text style={style.textError}>
          Geolocation is not available, please enable it in your App settings
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Weekly;
