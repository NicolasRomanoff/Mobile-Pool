import { black, yellow } from "@/assets/style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../components/Typography";
import CalculatorRow from "./components/CalculatorRow";

const calculator = [
  ["7", "8", "9", "C", "AC"],
  ["4", "5", "6", "+", "-"],
  ["1", "2", "3", "*", "/"],
  ["0", ".", "00", "=", ""],
];

const Ex02 = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 / 3, backgroundColor: yellow }}>
        <Typography color="black">Calculator</Typography>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: black,
          alignItems: "flex-end",
          paddingEnd: 10,
        }}
      >
        <Typography size="lg">0</Typography>
        <Typography size="lg">0</Typography>
      </View>
      <View style={{ flex: 2, backgroundColor: yellow }}>
        {calculator.map((row, i) => (
          <CalculatorRow key={i} row={row} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Ex02;
