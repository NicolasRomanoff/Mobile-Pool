import { StyleSheet } from "react-native";

export const black = "#1b1b1b";
export const yellow = "#bb9200";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: black,
  },
  button: {
    backgroundColor: yellow,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
  },
});

export default style;
