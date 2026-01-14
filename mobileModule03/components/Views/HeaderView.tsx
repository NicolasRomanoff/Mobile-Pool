import useLocationStore from "@/hooks/locationStore";
import { View, ViewProps } from "react-native";
import { Typography } from "../Typography";

const HeaderView: React.FC<ViewProps> = ({ style, ...props }) => {
  const { location } = useLocationStore();
  return (
    <View style={[{ flex: 1 / 4, justifyContent: "center" }, style]} {...props}>
      <Typography size="sm">{location.city}</Typography>
      <Typography size="sm">
        {location.region}
        {location.region && location.country && ", "}
        {location.country}
      </Typography>
    </View>
  );
};

export default HeaderView;
