import mobileStyles from "@/assets/style";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { providers, TProvider } from "@/utils/const";
import { SafeAreaView } from "react-native-safe-area-context";

const Authentification = () => {
  const { logIn } = useAuth();
  return (
    <SafeAreaView style={mobileStyles.container}>
      {Object.keys(providers).map((provider) => (
        <Button key={provider} onClick={() => logIn(provider as TProvider)}>
          <Typography color="black">
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Typography>
        </Button>
      ))}
    </SafeAreaView>
  );
};

export default Authentification;
