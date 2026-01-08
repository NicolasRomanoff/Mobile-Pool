import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorBtn from "./CalculatorBtn";

const Ex03 = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 / 3, backgroundColor: "#4476c7" }}>
        <Text
          style={{
            flex: 1,
            fontSize: 25,
            textAlign: "center",
            textAlignVertical: "center",
            color: "white",
          }}
        >
          Calculator
        </Text>
      </View>
      <View style={{ flex: 2, backgroundColor: "#203d6b" }}>
        <Text
          style={{
            fontSize: 50,
            textAlign: "right",
            padding: 5,
            color: "#4476c7",
          }}
        >
          {expression}
        </Text>
        <Text
          style={{
            fontSize: 50,
            textAlign: "right",
            padding: 5,
            color: "#4476c7",
          }}
        >
          {result}
        </Text>
      </View>
      <View style={{ flex: 2, backgroundColor: "#4476c7" }}>
        <CalculatorRow
          btnValues={[
            { value: "7", color: "black" },
            { value: "8", color: "black" },
            { value: "9", color: "black" },
            { value: "C", color: "red" },
            { value: "AC", color: "red" },
          ]}
          setExpression={setExpression}
          setResult={setResult}
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "4", color: "black" },
            { value: "5", color: "black" },
            { value: "6", color: "black" },
            { value: "+", color: "white" },
            { value: "-", color: "white" },
          ]}
          setExpression={setExpression}
          setResult={setResult}
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "1", color: "black" },
            { value: "2", color: "black" },
            { value: "3", color: "black" },
            { value: "*", color: "white" },
            { value: "/", color: "white" },
          ]}
          setExpression={setExpression}
          setResult={setResult}
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "0", color: "black" },
            { value: ".", color: "black" },
            { value: "00", color: "black" },
            { value: "=", color: "white" },
            { value: "", color: "" },
          ]}
          setExpression={setExpression}
          setResult={setResult}
        ></CalculatorRow>
      </View>
    </SafeAreaView>
  );
};

const CalculatorRow: React.FC<{
  btnValues: { value: string; color: string }[];
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}> = ({ btnValues, setExpression, setResult }) => {
  return (
    <View
      style={{
        flex: 1 / 4,
        flexDirection: "row",
      }}
    >
      {btnValues.map((btnValue, i) => {
        return (
          <CalculatorBtn
            key={i}
            btnValue={btnValue}
            setExpression={setExpression}
            setResult={setResult}
          ></CalculatorBtn>
        );
      })}
    </View>
  );
};

export default Ex03;
