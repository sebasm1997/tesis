import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export function Favorites() {
  const [quantity, setQuantity] = useState('1');

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (parseInt(prevQuantity) + 1).toString());
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, parseInt(prevQuantity) - 1); // Prevent going below 1
      return newQuantity.toString();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/img/imagen6.png')} // Ruta a tu imagen
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Airbag Piloto Renault Logan 2018</Text>
          <Text style={styles.price}>$300.00</Text>
          <Text style={styles.description}>
            Airbag NUEVO
            {'\n'}
            Incluye la tapa y los componentes internos necesarios para su funcionamiento.
            {'\n'}
            Color de tapa negra (puede ser cambiado y personalizado).
            {'\n'}
            1 año de garantía contra defectos de fábrica.
            {'\n'}
            El valor del Airbag incluye el servicio de instalación y escaneo computarizado (aplica llevando el vehículo a nuestros talleres).
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.adjustButton}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
          <TouchableOpacity onPress={incrementQuantity} style={styles.adjustButton}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => alert(`Ordenar ${quantity} productos`)}
        >
          <Text style={styles.orderButtonText}>Ordenar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#a52a2a', // Color marrón oscuro para el precio
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  adjustButton: {
    backgroundColor: '#8b4513', // Color marrón para los botones de ajuste
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  adjustButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
  orderButton: {
    backgroundColor: '#8b4513', // Color marrón para el botón de ordenar
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
