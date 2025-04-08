import style from "@/assets/style";
import useLocationStore from "@/hooks/locationStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Today = () => {
  const { location } = useLocationStore();
  return (
    <SafeAreaView style={style.container}>
      <Text>Today</Text>
      <Text>{location}</Text>
    </SafeAreaView>
  );
};

export default Today;
