import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import useLocationStore from "@/hooks/locationStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Today = () => {
  const { location } = useLocationStore();
  return (
    <SafeAreaView style={style.container}>
      <Typography>Today</Typography>
      <Typography>{location}</Typography>
    </SafeAreaView>
  );
};

export default Today;
