import {StyleSheet} from "react-native"


 export const styles = StyleSheet.create({

  container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
  },
  scrollView: {
    flexGrow: 1,  // Permite que el contenido dentro del ScrollView se expanda
    backgroundColor: "#faebd7", // Color marrón de fondo
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 250,
    margin: 10,
  },
  content: {
    marginHorizontal: 40,
  },
  btnContainer: {
    width: "90%",        // Ajusta el tamaño del botón
    alignSelf: "center", // Centra el botón horizontalmente
    marginBottom: 20,    // Añade espacio en la parte inferior de la pantalla
  },
  logoutBtn: {
    backgroundColor: "tomato",
  },
 })