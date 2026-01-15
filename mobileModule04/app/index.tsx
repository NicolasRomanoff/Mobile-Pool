import mobileStyles from "@/assets/style";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const DiaryApp = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography>Welcome to your Diary</Typography>
      <Button
        onClick={() =>
          user ? router.push(`../diary`) : router.push("../login")
        }
      >
        <Typography color="black">Login</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default DiaryApp;
