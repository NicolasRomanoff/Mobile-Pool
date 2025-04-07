import { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex01 = () => {
  const [btnValue, setBtnValue] = useState("A simple text");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40 }}>{btnValue}</Text>
      <Button
        title="Click me"
        onPress={() => {
          setBtnValue(
            btnValue === "Hello World!" ? "A simple text" : "Hello World!"
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Ex01;
