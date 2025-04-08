import style from "@/assets/style";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Today = () => {
  return (
    <SafeAreaView style={style.container}>
      <Text>Today</Text>
    </SafeAreaView>
  );
};

export default Today;
