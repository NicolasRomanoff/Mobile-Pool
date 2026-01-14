import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const DiaryApp = () => {
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography>Welcome to your Diary</Typography>
      <Button onClick={() => router.push(`../login`)}>
        <Typography color="black">Login</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default DiaryApp;
