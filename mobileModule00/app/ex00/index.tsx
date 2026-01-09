import style from "@/assets/style";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex00 = () => {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.text}>A simple text</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => console.log("Button pressed")}
      >
        <Text style={style.buttonText}>Click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Ex00;
