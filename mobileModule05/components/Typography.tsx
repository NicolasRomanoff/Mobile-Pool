import mobileStyles, {
  black,
  blue,
  grey,
  red,
  white,
  yellow,
} from "@/assets/style";
import { Text, TextProps } from "react-native";

const typographyVariants = {
  style: { default: mobileStyles.text },
  size: { lg: 30, md: 20, sm: 15, xs: 10 },
  color: {
    black: black,
    yellow: yellow,
    white: white,
    red: red,
    grey: grey,
    blue: blue,
  },
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
