import { Text, TouchableOpacity } from "react-native";

const CalculatorBtn: React.FC<{
  btnValue: { value: string; color: string };
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}> = ({ btnValue, setExpression, setResult }) => {
  const calcul = (
    expression: string,
    setResult: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!expression.match(/^[+-]?\d+(\.\d+)?([+\-*/][+-]?\d+(\.\d+)?)*$/)) {
      setResult(expression ? "Invalid syntax" : "");
      return;
    }
    setResult(new Function(`return ${expression}`)());
  };

  const handleBtn = () => {
    switch (btnValue.value) {
      case "C":
        setExpression((prev) => prev.slice(0, prev.length - 1));
        break;
      case "AC":
        setExpression("");
        setResult("");
        break;
      case "=":
        setExpression((prev) => {
          calcul(prev, setResult);
          return "";
        });
        break;
      default:
        if (btnValue.value) {
          setExpression((prev) => {
            return prev + btnValue.value;
          });
        }
    }
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => {
        if (btnValue.value) {
          handleBtn();
        }
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
