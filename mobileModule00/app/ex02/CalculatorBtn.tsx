import { Text, TouchableOpacity, View } from "react-native";

const CalculatorBtn: React.FC<{
  btnValue: { value: string; color: string };
}> = ({ btnValue }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => {
        if (btnValue.value) console.log(btnValue.value);
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 30,
          textAlign: "center",
          textAlignVertical: "center",
          color: btnValue.color,
        }}
      >
        {btnValue.value}
      </Text>
    </TouchableOpacity>
  );
};

export default CalculatorBtn;
