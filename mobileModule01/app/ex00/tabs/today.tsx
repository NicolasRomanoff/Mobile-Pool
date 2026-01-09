import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

const Today = () => {
  return (
    <SafeAreaView style={style.container}>
      <Typography>Today</Typography>
    </SafeAreaView>
  );
};

export default Today;
