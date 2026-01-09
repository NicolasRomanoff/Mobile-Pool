import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useLocationStore from "@/hooks/locationStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Weekly = () => {
  const { location } = useLocationStore();
  return (
    <SafeAreaView style={style.container}>
      <Typography>Weekly</Typography>
      <Typography>{location}</Typography>
    </SafeAreaView>
  );
};

export default Weekly;
