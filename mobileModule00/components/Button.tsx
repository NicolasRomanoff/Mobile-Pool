import style from "@/assets/style";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export const Button: React.FC<
  Omit<TouchableOpacityProps, "onPress"> & {
    onClick?: (event: GestureResponderEvent) => void;
  }
> = ({ onClick, ...props }) => {
  return <TouchableOpacity style={style.button} onPress={onClick} {...props} />;
};
