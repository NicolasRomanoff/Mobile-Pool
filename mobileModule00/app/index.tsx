import mobileStyles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const NUMBER_OF_EXERCICES = 4;

const Index = () => {
  return (
    <SafeAreaView style={mobileStyles.container}>
      <Typography>Mobile Module 00</Typography>
      {Array.from({ length: NUMBER_OF_EXERCICES }).map((_, i) => {
        const nb = i.toString().padStart(2, "0");
        return (
          <Button
            key={i}
            style={mobileStyles.button}
            onClick={() => router.push(`../ex${nb}`)}
          >
            <Typography color="black">ex{nb}</Typography>
          </Button>
        );
      })}
    </SafeAreaView>
  );
};

export default Index;
