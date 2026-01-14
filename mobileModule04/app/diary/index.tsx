import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const app = getApp();
const auth = getAuth(app);

const Diary = () => {
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography>Diary</Typography>
      <Typography>You are logged</Typography>
      <Button onClick={async () => await signOut(auth)}>
        <Typography color="black">Log out</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Diary;
