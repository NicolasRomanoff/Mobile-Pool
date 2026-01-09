import style from "@/assets/style";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex01 = () => {
  const [btnValue, setBtnValue] = useState("A simple text");
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.text}>{btnValue}</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          setBtnValue(
            btnValue === "Hello World!" ? "A simple text" : "Hello World!"
          );
        }}
      >
        <Text style={style.buttonText}>Click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Ex01;
