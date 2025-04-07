import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ex00 = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40 }}>A simple text</Text>
      <Button
        title="Click me"
        onPress={() => {
          console.log("Button pressed");
        }}
      />
    </SafeAreaView>
  );
};

export default Ex00;
