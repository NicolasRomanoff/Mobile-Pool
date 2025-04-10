import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  topBar: {
    height: 70,
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    color: "white",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
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
    zIndex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
  grayText: {
    textAlign: "center",
    color: "gray",
    fontSize: 15,
  },
  suggestionText: {
    fontSize: 20,
    color: "black",
  },
  textError: {
    textAlign: "center",
    fontSize: 15,
    color: "red",
    marginHorizontal: 50,
  },
});

export default style;
