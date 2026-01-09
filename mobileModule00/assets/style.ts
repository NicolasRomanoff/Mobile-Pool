import { StyleSheet } from "react-native";

const black = "#1b1b1b";
const yellow = "#bb9200";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: black,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    color: yellow,
  },
  button: {
    backgroundColor: yellow,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    color: black,
  },
});

export default style;
