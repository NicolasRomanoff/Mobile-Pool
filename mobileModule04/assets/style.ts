import { StyleSheet } from "react-native";

export const black = "#1b1b1b";
export const yellow = "#bb9200";
export const white = "#cdcdc7";
export const red = "#b21926";
export const grey = "#6d6d6d";
export const blue = "#3d7eff";

const mobileStyles = StyleSheet.create({
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
    justifyContent: "center",
  },
  ghostBtn: {
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: white,
    borderColor: white,
    outlineColor: black,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
  },
  icon: { alignSelf: "center" },
  topBar: {
    height: 70,
    backgroundColor: yellow,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
  },
  bottomBar: {
    height: 70,
    backgroundColor: yellow,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
  },
  suggestion: {
    position: "absolute",
    backgroundColor: "darkgray",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 1,
    padding: 10,
    zIndex: 999,
  },
  text: {
    textAlign: "center",
  },
});

export default mobileStyles;
