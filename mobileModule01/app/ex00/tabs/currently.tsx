import style from "@/assets/style";
import { Typography } from "@/components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

const Currently = () => {
  return (
    <SafeAreaView style={style.container}>
      <Typography>Currently</Typography>
    </SafeAreaView>
  );
};

export default Currently;
