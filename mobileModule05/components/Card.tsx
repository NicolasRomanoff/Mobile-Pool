import { black, yellow } from "@/assets/style";
import { View, ViewProps } from "react-native";

const Card: React.FC<ViewProps> = ({ style, ...props }) => {
  return (
    <View
      style={[
        {
          backgroundColor: black,
          borderRadius: 10,
          borderColor: yellow,
          borderWidth: 2,
          width: "95%",
          padding: 10,
          gap: 10,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default Card;
