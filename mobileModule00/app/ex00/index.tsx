import style from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex00 = () => {
  return (
    <SafeAreaView style={style.container}>
      <Typography>A simple text</Typography>
      <Button onClick={() => console.log("Button pressed")}>
        <Typography color="black">Click me</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Ex00;
