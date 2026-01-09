import style from "@/assets/style";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NUMBER_OF_EXERCICES = 4;

const Index = () => {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.text}>Mobile Module 00</Text>
      {Array.from({ length: NUMBER_OF_EXERCICES }).map((_, i) => {
        const nb = i.toString().padStart(2, "0");
        return (
          <TouchableOpacity
            key={i}
            style={style.button}
            onPress={() => router.push(`../ex${nb}`)}
          >
            <Text style={style.buttonText}>ex{nb}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default Index;
