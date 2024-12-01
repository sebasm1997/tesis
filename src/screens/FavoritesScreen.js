import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet,ScrollView, TouchableOpacity, TextInput,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { screen } from "../utils";
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';


export function CarroScrenn() {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false); // Para mostrar el mensaje de éxito

  const orderMutation_todo = gql`
    mutation OrderMutation($orderInput: OrderInput!) {
      createOrder(orderInput: $orderInput) {
        message
        data
      }
    }
  `;
  
  const [orderMutation, { data, loading, error }] = useMutation(orderMutation_todo);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          const email = await AsyncStorage.getItem('email');
          const userId = await AsyncStorage.getItem('user_id');
          setUser({
            email: email,
            userId: userId
          });

          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        } catch (e) {
          console.error('Error al cargar el carrito desde AsyncStorage', e);
        }
      };

      loadCart();
      return () => {};
    }, [])
  );

  const orderCart = async () => {
    const orderInput = {
      userId: parseInt(user.userId),
      customerName: user.email,
      detailsOrder: cart.map(producto => ({
        productId:producto.id,
        productName: producto.name,
        quantity: producto.quantity,
        price: producto.price,
        img: producto.img
      }))
    };

    try {
      await orderMutation({ variables: { orderInput } });
      await AsyncStorage.removeItem('cart');
      setCart([]);
      setSuccessMessageVisible(true); // Mostrar mensaje de éxito

      setTimeout(() => {
        setSuccessMessageVisible(false); // Ocultar mensaje después de 3 segundos
      }, 3000);
    } catch (e) {
      console.error('Error', e);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCart([]);
    } catch (e) {
      console.error('Error al remover el carrito desde AsyncStorage', e);
    }
  };

  const getUserLogged = async () => {
    const user = await AsyncStorage.getItem('email');
    if (!user) {
      navigation.navigate(screen.Cuenta.login);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserLogged();
      return () => {};
    }, [])
  );
  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {cart.length > 0 && cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemText}>{item?.name}, Cantidad:{item.quantity}, Total:{item.quantity*item.price}</Text>
            
          </View>
        ))}
        {cart.length === 0 && <Text style={styles.emptyCartText}>No hay Producto en el carrito</Text>}
        
        {cart.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={orderCart}
            style={styles.orderButton}
          >
            <Text style={styles.orderButtonText}>Ordenar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearCart}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Limpiar Carrito</Text>
          </TouchableOpacity>
        </View>

        {successMessageVisible && (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessageText}>Tu orden fue enviada. Revisa tu Listado.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5e8d9',
    flexGrow: 1,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f2f2',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  itemText: {
    fontSize: 20,
    color: '#000000',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#0a0000',
    textAlign: 'center',
    marginVertical: 50,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderButton: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    position: 'absolute',  // Para posicionar el contenedor de forma absoluta
    bottom: 0,  // Lo coloca en la parte inferior de la pantalla
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,  // Para darle un pequeño margen alrededor
  },

  successMessageText: {
    color: '#fff',  // El texto es blanco para mayor contraste
    fontSize: 16,
    textAlign: 'center',  // Centrar el texto dentro del contenedor
  },
});