import style, { black, yellow } from "@/assets/style";
import { Text, TextProps } from "react-native";

const typographyVariants = {
  style: { default: style.text, button: style.buttonText },
  color: { black: black, yellow: yellow },
};
type TTypographyVariants = typeof typographyVariants;

export const Typography: React.FC<
  TextProps & {
    variant?: keyof TTypographyVariants["style"];
    color?: keyof TTypographyVariants["color"];
  }
> = ({ variant = "default", color = "yellow", children, style, ...props }) => {
  return (
    <Text
      {...props}
      style={[
        typographyVariants.style[variant],
        style,
        color && { color: typographyVariants.color[color] },
      ]}
    >
      {children}
    </Text>
  );
};
