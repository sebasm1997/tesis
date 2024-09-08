import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { host } from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
export function ViewRestaurantScreen(props) {
  const { route } = props;
  const idProduct = route.params.id;

  const GET_PRODUCT = gql`
    query Product($id: ID!) {
      product(id: $id) {
        id
        name
        description
        stock
        img
        price
      }
    }
  `;

  const [quantity, setQuantity] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: idProduct },
  });

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
// se cambia todo 
const handleOrder = async () => {
  if (data && data.product) {
    try {
      const productToSave = {
        id: idProduct,
        name: data.product.name,
        price: data.product.price,
        quantity: quantity,
      };

      let cart = await AsyncStorage.getItem('cart');
      if (!cart) {
        cart = [];
      } else {
        cart = JSON.parse(cart);
      }

      const existingProductIndex = cart.findIndex(item => item.id === idProduct);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = quantity; // Update quantity if product already in cart
      } else {
        cart.push(productToSave); // Add new product to cart
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));

      console.log(cart);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Producto guardado',
        text2: `Producto guardado: ${data.product.name}`,
      });
    } catch (e) {
      console.error('Error al guardar el producto en AsyncStorage', e);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No se pudo guardar el producto.',
      });
    }
  } else {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'No se pudieron obtener los detalles del producto.',
    });
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      {error && <Text>{error.message}</Text>}
      {loading && <Text>Loading...</Text>}
      {data && (
        <>
          <View style={styles.content}>
            <Image
              source={{ uri: `${host}/images/${data.product.img}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.product.name}</Text>
              <Text style={styles.price}>Disponible {data.product.stock}</Text>
              <Text style={styles.price}>Precio {data.product.price}</Text>
              <Text style={styles.description}>{data.product.description}</Text>
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
                value={quantity.toString()}
                onChangeText={(text) => {
                  const parsed = parseInt(text);
                  if (!isNaN(parsed)) {
                    setQuantity(parsed);
                  }
                }}
              />
              <TouchableOpacity onPress={incrementQuantity} style={styles.adjustButton}>
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handleOrder}
            >
              <Text style={styles.orderButtonText}>Ordenar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5e8d9',
    alignItems: 'center',
  },
  content: {
    
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    marginBottom: 20,
    marginTop: -30, // Mover la imagen más arriba
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Para Android, añade una leve sombra
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
   
    fontSize: 22, // Un poco más grande para destacar
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5, // Espaciado entre letras para más elegancia
  },
  price: {
    fontSize: 18,
    color: '#0f0e0e',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600', // Un poco más negrita para resaltar el precio
  },
  description: {
    fontSize: 16,
    color: '#0f0e0e',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: '600', // Para dar un toque estilizado
  },
  bottomContainer: {
   
    alignItems: 'center',
    marginTop: 30,
  },
  quantityContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  adjustButton: {
    backgroundColor: "tomato",
    borderRadius: 10, // Bordes más redondeados para un look moderno
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  adjustButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900', // Un poco más grueso para resaltar
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
    backgroundColor: '#fff', // Fondo blanco para mejor visibilidad
    elevation: 2, // Leve elevación para sombra
  },
  orderButton: {
    backgroundColor: "tomato",
    borderRadius: 80, // Un poco más de redondeo para suavizar
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 160, // Un poco más grande
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Para Android
  },
  orderButtonText: {
    backgroundColor: "tomato",
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase', // Para dar énfasis en el botón
    letterSpacing: 1, // Espacio entre letras
  },
  saveButton: {
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  saveButtonText: {
    backgroundColor: "tomato",
    fontSize: 16,
    backgroundColor: "tomato",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
