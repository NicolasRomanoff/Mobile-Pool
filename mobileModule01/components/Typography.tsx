import mobileStyles, { black, yellow } from "@/assets/style";
import { Text, TextProps } from "react-native";

const typographyVariants = {
  style: { default: mobileStyles.text },
  size: { lg: 50, md: 30, sm: 20 },
  color: { black: black, yellow: yellow },
};
type TTypographyVariants = typeof typographyVariants;

export const Typography: React.FC<
  TextProps & {
    variant?: keyof TTypographyVariants["style"];
    size?: keyof TTypographyVariants["size"];
    color?: keyof TTypographyVariants["color"];
  }
> = ({
  variant = "default",
  size = "md",
  color = "yellow",
  children,
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        typographyVariants.style[variant],
        style,
        { fontSize: typographyVariants.size[size] },
        { color: typographyVariants.color[color] },
      ]}
    >
      {children}
    </Text>
  );
};
