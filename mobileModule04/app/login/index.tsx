import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { getApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const app = getApp();
const auth = getAuth(app);

const signInWithProvider = async (
  provider: GoogleAuthProvider | GithubAuthProvider
) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    console.log("User logged :", user);
  } catch {
    console.log("Connexion error");
  }
};

const Authentification = () => {
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
        <Typography color="black">Google</Typography>
      </Button>
      <Button onClick={() => signInWithProvider(new GithubAuthProvider())}>
        <Typography color="black">Github</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Authentification;
