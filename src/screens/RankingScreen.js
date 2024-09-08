import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { screen } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';

export function ListadoScreen() {
const navigation = useNavigation();
const [user,setUser] = useState({
  email: '',
  userId:0
});

const orderMutation_todo = gql`
query OrdersByUser($userId: Int!){
  getOrdersByUserId(id: $userId) {
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
    user {
      id
    }
  } 
}
`;


const { loading, error, data, refetch    } = useQuery(orderMutation_todo, {
  variables: { userId: parseInt(user.userId) },
  skip: !user.userId, // Skip query until userId is set
});



const getUserLogged = async () =>{
    

  const email = await AsyncStorage.getItem('email');
  const userId = await AsyncStorage.getItem('user_id');

  if(!email){
    navigation.navigate(screen.Cuenta.login);
  }else{
    setUser({
      email: email,
      userId: userId
    });


  }
}
const goToOrer=(item)=>{
  navigation.navigate(screen.Detalle.search, { id: item.id });

}


useFocusEffect(
  useCallback(() => {
    getUserLogged();

    return () => {

    };
  }, [])
);

useFocusEffect(
  useCallback(() => {
    if (user.userId) {
      refetch(); // Refetch the query when screen is focused
    }
  }, [user, refetch])
);


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
// useEffect(()=>{
// console.log(data,loading, error)
// },[data,loading, error])
return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.header}>Órdenes</Text>
      {data && data.getOrdersByUserId.map((item) => (
        <TouchableOpacity
          style={styles.orderContainer}
          onPress={() => goToOrer(item)}
          key={item.id} // Añadido para evitar errores de clave en listas
        >
          <Text style={styles.orderNumber}>Orden #{item.id}</Text>
          <Text style={styles.status}>{getStatus(item.status)}</Text>
          <Text style={styles.date}>{getDate(item.date)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    
      backgroundColor: '#f5e8d9',
      flexGrow: 1,
    
    
    justifyContent: 'center',
    alignItems: 'center',
   
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
    backgroundColor: "tomato", 
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
    marginBottom: 5,
    
  },
  status: {
    
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  date: {
    textAlign: 'right',
    fontSize: 14,
    color: '#777',
  },
});

export default ListadoScreen;