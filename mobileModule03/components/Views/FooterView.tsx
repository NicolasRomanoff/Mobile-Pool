import { View, ViewProps } from "react-native";

const FooterView: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[{ flex: 1 / 4 }, style]} {...props} />;
};

export default FooterView;
