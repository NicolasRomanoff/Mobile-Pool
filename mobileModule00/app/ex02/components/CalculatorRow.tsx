import { View, ViewProps } from "react-native";
import CalculatorBtn from "./CalculatorBtn";

const CalculatorRow: React.FC<ViewProps & { row: string[] }> = ({
  row,
  ...props
}) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }} {...props}>
      {row.map((btn) => (
        <CalculatorBtn key={btn} value={btn} />
      ))}
    </View>
  );
};

export default CalculatorRow;
