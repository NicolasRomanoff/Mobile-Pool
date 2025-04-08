import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Currently = () => {
  const { location } = useLocationStore();
  return (
    <SafeAreaView style={style.container}>
      <Text>Currently</Text>
      <Text>{location}</Text>
    </SafeAreaView>
  );
};

export default Currently;
