import mobileStyles from "@/assets/style";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const signInWithProvider = async ({
  auth,
  provider,
}: {
  auth: Auth;
  provider: GoogleAuthProvider | GithubAuthProvider;
}) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    console.log("User logged :", user);
  } catch {
    console.log("Connexion error");
  }
};

const Authentification = () => {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Button
        onClick={() =>
          signInWithProvider({ auth, provider: new GoogleAuthProvider() })
        }
      >
        <Typography color="black">Google</Typography>
      </Button>
      <Button
        onClick={() =>
          signInWithProvider({ auth, provider: new GithubAuthProvider() })
        }
      >
        <Typography color="black">Github</Typography>
      </Button>
    </SafeAreaView>
  );
};

export default Authentification;
