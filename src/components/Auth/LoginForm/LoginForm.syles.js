import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    padding: 20,
    backgroundColor: "#f5f5f5", // Color de fondo
    borderRadius: 10, 
    shadowColor: "#000", // 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },

  inputText: {
    color: "#333", 
  },
  icon: {
    color: "tomato", 
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    backgroundColor: "tomato", 
    paddingVertical: 12, 
    borderRadius: 8, 
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});