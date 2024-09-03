import React, { useState, useEffect,  } from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { getData } from "../../../utils/authStorage";
import { styles } from "./RestaurantsScreen.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from '@apollo/client';
import { host } from "../../../utils/constants";

export function ProductosScreens(props) {
    

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
  const { loading, error, data } = useQuery(GET_DOGS);
  const navigation = useNavigation();

    const [currentUser, setCurrentUser] = useState(null);

    // const getUserLogged = async () =>{
    //     const auth = await getData();
    //     console.log(auth)
    // // setCurrentUser(user);
    // }

    // useEffect(() => {
    //     getUserLogged();
    // }, []);


    const goToProduct = (item) => {
        navigation.navigate(screen.Prouctos.viewRestaurant, { id: item.id });
      };

    return (
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
    );
}