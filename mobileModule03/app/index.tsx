import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#808080",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#ffffff" }}>Mobile Module 02</Text>
      <Button
        title="Exercise 00"
        onPress={() => {
          router.push("../ex00");
        }}
      />
      <Button
        title="Exercise 01"
        onPress={() => {
          router.push("../ex01");
        }}
      />
      <Button
        title="Exercise 02"
        onPress={() => {
          router.push("../ex02");
        }}
      />
      <Button
        title="Exercise 03"
        onPress={() => {
          router.push("../ex03");
        }}
      />
    </SafeAreaView>
  );
};

export default Index;
