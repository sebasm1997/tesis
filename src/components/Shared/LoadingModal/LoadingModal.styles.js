import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      height: 100,
      width: 200,
      backgroundColor: "#fff",
      borderColor: "#00a680",
      borderWidth: 2,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#00680",
      textTransform: "uppercase",
      marginTop: 10,
    },
  });