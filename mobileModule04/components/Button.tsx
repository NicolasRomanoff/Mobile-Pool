import mobileStyles from "@/assets/style";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const buttonVariants = {
  variant: { default: mobileStyles.button, ghost: mobileStyles.ghostBtn },
};
type TTButtonVariants = typeof buttonVariants;

export const Button: React.FC<
  Omit<TouchableOpacityProps, "onPress"> & {
    onClick?: (event: GestureResponderEvent) => void;
    variant?: keyof TTButtonVariants["variant"];
  }
> = ({ onClick, variant = "default", style, disabled, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        buttonVariants.variant[variant],
        disabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onClick}
      disabled={disabled}
      {...props}
    />
  );
};
