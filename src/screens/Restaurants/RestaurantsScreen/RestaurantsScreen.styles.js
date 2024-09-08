import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 15, // Espacio alrededor del contenido
      backgroundColor: '#f5e8d9', // Color marrón (SaddleBrown)
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Permite que los elementos se ajusten en varias filas
      justifyContent: 'space-between', // Espacio entre columnas
    },
    imageTextContainer: {
      width: '48%', // Ancho de cada celda (2 columnas)
      alignItems: 'center',
      backgroundColor: '#fff', // Fondo blanco para cada celda
      borderRadius: 12, // Bordes redondeados para cada celda
      padding: 10, // Espacio interno de la celda
      marginBottom: 20, // Espacio entre filas
      shadowColor: '#000', // Sombra para mejor visibilidad
      shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
      shadowOpacity: 0.2, // Opacidad de la sombra
      shadowRadius: 8, // Difuminado de la sombra
      elevation: 5, // Elevación para sombra en Android
    },
    image: {
      width: '100%', // Ancho completo del contenedor de la celda
      height: 110, // Ajusta la altura de la imagen
      borderRadius: 8, // Esquinas redondeadas para la imagen
      marginBottom: 10, // Espacio entre la imagen y el texto
    },
    imageText: {
      fontSize: 16, // Tamaño del texto
      color: '#333', // Color del texto
      textAlign: 'center', // Centrar el texto horizontalmente
    },
    btnContainer: {
      marginTop: 30, // Espacio superior para el botón
    },
  });