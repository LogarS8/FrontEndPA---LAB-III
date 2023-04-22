import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: 4,
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputField: {
    backgroundColor: "#f6f6f6",
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  button: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
  },
  buttonReturn: {
    position: "absolute",
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  divider: {
    borderBottomColor: "#e0e0e0",
    marginVertical: 10,
  },
});
