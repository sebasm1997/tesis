import React, { useState  } from "react";
import { View, Text, Image,TouchableOpacity,ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { getData } from "../../../utils/authStorage";
import { styles } from "./RestaurantsScreen.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from '@apollo/client';
import { host } from "../../../utils/constants";

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProductosScreens() {
    

    const GET_DOGS = gql`
query Products {
  products(offset: 0, limit: 1000, filter: "") {
    data {
      id
      name
      description
      stock
      img
    }
    total
  }
}
  `;
  const { loading, error, data,refetch } = useQuery(GET_DOGS);
  const navigation = useNavigation();


    const goToProduct = (item) => {
      console.log(item)
        navigation.navigate(screen.Prouctos.viewRestaurant, { id: item.id });
      };



      const getUserLogged = async () =>{
        const user = await AsyncStorage.getItem('email');
    
        if(!user){
          navigation.navigate(screen.Cuenta.login);
        }
    }

      useFocusEffect(
        useCallback(() => {
          getUserLogged();
          refetch();
      
          return () => {
      
          };
        }, [refetch])
      );



    return (
      <ScrollView  style={styles.content}>
        <View style={styles.content}>
            <View style={styles.gridContainer}>
            {
        error && <Text> {error.message}</Text>
      }
      {
        loading && <Text> loading</Text>
      }
      { data && data.products.data.map((item) => (
        <TouchableOpacity style={styles.imageTextContainer} onPress={() => goToProduct(item)}>


             <Image
                        src={host + '/images/'+ item.img}
                        style={styles.image}
                    />
             <Text style={styles.imageText}>{item.name}</Text>
             <Text style={styles.imageText}>Disponible {item.stock}</Text>

        </TouchableOpacity>
        
      ))}
            </View>
        </View>
        </ScrollView>
    );
}