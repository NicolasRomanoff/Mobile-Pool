import { View, ViewProps } from "react-native";

const ContentView: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[{ flex: 1 / 2 }, style]} {...props} />;
};

export default ContentView;
