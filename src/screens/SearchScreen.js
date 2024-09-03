import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export function DetalleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalles de la Orden</Text>
      <View style={styles.orderContainer}>
        <Text style={styles.orderNumber}>Orden #1</Text>
        <Text style={styles.detail}><Text style={styles.label}>Fecha:</Text> 23-07-2024</Text>
        <Text style={styles.detail}><Text style={styles.label}>Estado:</Text> Completado</Text>
        <Text style={styles.detail}><Text style={styles.label}>Cantidad:</Text> 5</Text>
        <Text style={styles.detail}><Text style={styles.label}>Producto:</Text> Airbag Piloto Renault Logan</Text>
        <Text style={styles.detail}><Text style={styles.label}>Precio:</Text> 300$</Text>
        <Text style={styles.detail}><Text style={styles.label}>Precio Total:</Text> 1.500$</Text>
        <Text style={styles.detail}><Text style={styles.label}>Imagen:</Text></Text>
        <Image
          source={{ uri: 'https://tiendaairbag.com/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-22-at-15.25.37.jpeg' }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
  },
  orderContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: 300,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default DetalleScreen;
