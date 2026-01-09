import mobileStyles from "@/assets/style";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export const Button: React.FC<
  Omit<TouchableOpacityProps, "onPress"> & {
    onClick?: (event: GestureResponderEvent) => void;
  }
> = ({ onClick, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[mobileStyles.button, style]}
      onPress={onClick}
      {...props}
    />
  );
};
