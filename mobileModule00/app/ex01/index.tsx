import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex01 = () => {
  const [btnValue, setBtnValue] = useState("A simple text");
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography>{btnValue}</Typography>
      <Button
        onClick={() => {
          setBtnValue(
            btnValue === "Hello World!" ? "A simple text" : "Hello World!"
          );
        }}
      >
        <Typography color="black">Click me</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Ex01;
