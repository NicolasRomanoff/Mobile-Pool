import mobileStyles, { yellow } from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { View, ViewProps } from "react-native";

const CalculatorBtn: React.FC<ViewProps & { value: string }> = ({
  value,
  ...props
}) => {
  return (
    <View
      style={[mobileStyles.container, { backgroundColor: yellow, padding: 2 }]}
      {...props}
    >
      {!!value && (
        <Button
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderWidth: 0,
            width: "100%",
          }}
          onClick={() => console.log(value)}
        >
          <Typography color="black">{value}</Typography>
        </Button>
      )}
    </View>
  );
};

export default CalculatorBtn;
