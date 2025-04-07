import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorBtn from "./CalculatorBtn";

const Ex02 = () => {
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
          0
        </Text>
        <Text
          style={{
            fontSize: 50,
            textAlign: "right",
            padding: 5,
            color: "#4476c7",
          }}
        >
          0
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
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "4", color: "black" },
            { value: "5", color: "black" },
            { value: "6", color: "black" },
            { value: "+", color: "white" },
            { value: "-", color: "white" },
          ]}
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "1", color: "black" },
            { value: "2", color: "black" },
            { value: "3", color: "black" },
            { value: "*", color: "white" },
            { value: "/", color: "white" },
          ]}
        ></CalculatorRow>
        <CalculatorRow
          btnValues={[
            { value: "0", color: "black" },
            { value: ".", color: "black" },
            { value: "00", color: "black" },
            { value: "=", color: "white" },
            { value: "", color: "" },
          ]}
        ></CalculatorRow>
      </View>
    </SafeAreaView>
  );
};

const CalculatorRow: React.FC<{
  btnValues: { value: string; color: string }[];
}> = ({ btnValues }) => {
  return (
    <View
      style={{
        flex: 1 / 4,
        flexDirection: "row",
      }}
    >
      {btnValues.map((btnValue) => {
        return <CalculatorBtn btnValue={btnValue}></CalculatorBtn>;
      })}
    </View>
  );
};

export default Ex02;
