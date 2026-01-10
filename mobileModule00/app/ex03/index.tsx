import { black, yellow } from "@/assets/style";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorBtn from "../../components/ex03/CalculatorBtn";

const calculator = [
  ["7", "8", "9", "C", "AC"],
  ["4", "5", "6", "+", "-"],
  ["1", "2", "3", "*", "/"],
  ["0", ".", "00", "=", ""],
];

const Ex03 = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const append = (value: string) => {
    setExpression((prev) => {
      return prev + value;
    });
  };

  const equal = () => {
    if (
      !expression.match(
        /^[+-]?\d+(\.\d+)?((?:\+(?!\+)|-(?!-)|\*(?!\*)|\/(?!\/))[+-]?\d+(\.\d+)?)*$/
      )
    ) {
      setResult(expression ? "Invalid syntax" : "");
      return;
    }
    const res = new Function(`return ${expression}`)();
    setResult(isNaN(res) ? "NaN" : res);
  };

  const clear = () => setExpression((prev) => prev.slice(0, prev.length - 1));

  const allClear = () => {
    setExpression("");
    setResult("");
  };

  const calculatorFns: Record<string, () => void> = {
    "=": equal,
    C: clear,
    AC: allClear,
  };

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
          padding: 10,
        }}
      >
        <Typography
          style={{ height: 40 }}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {expression}
        </Typography>
        <Typography
          style={{ height: 40 }}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {result}
        </Typography>
      </View>
      <View style={{ flex: 2, backgroundColor: yellow }}>
        {calculator.map((row, i) => (
          <View key={i} style={{ flex: 1, flexDirection: "row" }}>
            {row.map((btn) => (
              <CalculatorBtn
                key={btn}
                value={btn}
                onClick={() =>
                  calculatorFns[btn] ? calculatorFns[btn]() : append(btn)
                }
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Ex03;
