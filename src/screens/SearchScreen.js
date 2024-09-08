import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { screen } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

export function DetalleScreen(props) {
  const { route } = props;
  const idOrder = route.params.id;
  console.log(idOrder)

  const GET_ORDER = gql`
  query Order($id: ID!) {
    order(id: $id) {
      id
      date
      customerName
      totalAmount
      status
      details {
        id
        productName
        quantity
        price
      }
    }
  }
`;

  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id: idOrder },
  });


  const getUserLogged = async () =>{
      
  
    const user = await AsyncStorage.getItem('email');
  
    if(!user){
      navigation.navigate(screen.Cuenta.login);
    }
  }
  const getStatus = (status) => {
    let result = status;
    switch(status){
      case "PENDING":
        result = 'Pendiente';
        break;
        case "ACCEPTED":
          result = 'Aceptado';
          break;
          case "REJECTED":
            result = 'Rechazado';
            break;
            case "FINISHED" :
              result = 'Completado';
              break;
              default: 
              result = status;       
    }
    return result;
  }
  
  const getDate=(date)=> {
    return new Date(date).toISOString().split('T')[0];
  }
  
  useFocusEffect(
    useCallback(() => {
      getUserLogged();
  
      return () => {
  
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
           {error && <Text>{error.message}</Text>}
           {loading && <Text>Loading...</Text>}
      {data && <Text style={styles.header}>Detalles de la Orden #{data.order?.id}</Text>}
      {data && <Text style={styles.detail}><Text style={styles.label}>Fecha:</Text> {getDate(data.order?.date)}</Text>}
        {data && <Text style={styles.detail}><Text style={styles.label}>Estado:</Text> {getStatus(data.order?.status)}</Text>}
        {data && <Text style={styles.detail}><Text style={styles.label}>Precio Total:</Text> {(data.order?.totalAmount).toFixed(2)}$</Text>}
        { data && data.order.details.map((item) => (
          <View style={styles.orderContainer}>
      <Text style={styles.detail}><Text style={styles.label}>Producto:</Text> {item.productName}</Text>
        <Text style={styles.detail}><Text style={styles.label}>Cantidad:</Text> {item.quantity}</Text>
        <Text style={styles.detail}><Text style={styles.label}>Precio:</Text> {item.price}$</Text>

      </View>
        ))}
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5e8d9',
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
