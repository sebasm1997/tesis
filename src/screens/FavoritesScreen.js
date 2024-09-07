import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,FlatList } from 'react-native';
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
  const [user, setUser] = useState(null) 


  const orderMutation_todo = gql`
  mutation OrderMutation($orderInput: OrderInput!){
  createOrder(orderInput: $orderInput) {
    message,
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
          setUser(
            {
              email: email,
              userId : userId
            }
          )

      
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        } catch (e) {
          console.error('Error al cargar el carrito desde AsyncStorage', e);
        }
      };
  
      loadCart();
      return () => {

      };
    }, [])
  );




  const orderCart = async  () =>{

    const orderInput = {
      userId: parseInt(user.userId),
      customerName: user.email,
      detailsOrder: cart.map(producto => ({
        productName: producto.name,
        quantity: producto.quantity,
        price: producto.price
      }))
    };

    try{
      await orderMutation({ variables: { orderInput } });
      await AsyncStorage.removeItem('cart');
      setCart([])
      alert('Tu orden fue enviada, Reviza tus Ordenes');


    } catch (e) {
      console.error('Error', e);
    }
    
    
  // 
  }
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCart([])
    } catch (e) {
      console.error('Error al remover el carrito desde AsyncStorage', e);
    }
  }

  
  const getUserLogged = async () =>{
    

    const user = await AsyncStorage.getItem('email');

    if(!user){
      navigation.navigate(screen.Cuenta.login);
    }
}

  useFocusEffect(
    useCallback(() => {
      getUserLogged();
  
      return () => {
  
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {cart.length > 0 && cart.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <Text style={styles.itemText}>{item?.name} x {item.quantity}</Text>
        </View>
      ))}
      {cart.length === 0 && <Text style={styles.emptyCartText}>No hay Producto en el carrito</Text>}
  
      <View style={styles.buttonContainer}>
        <Button
          title="Ordenar"
          onPress={orderCart}
          color="#4CAF50" // Color verde para el botón de ordenar
        />
        <Button
          title="Limpiar Carrito"
          onPress={clearCart}
          color="#F44336" // Color rojo para el botón de limpiar
        />
      </View>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
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
      color: '#555',
    },
    emptyCartText: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginVertical: 50,
    },
    buttonContainer: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });