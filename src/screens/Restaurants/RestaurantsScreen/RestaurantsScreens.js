import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./RestaurantsScreen.styles";
import { screen } from "../../../utils";

export function Restaurants(props) {
    const navigation = props;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    const goToAddRestaurant = () => {
        navigation.navigate(screen.restaurants.addRestaurant);
    };

    return (
        <View style={styles.content}>
            <View style={styles.gridContainer}>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/image.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}>Airbag Copiloto Sail 
                    $350.00</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/imagen2.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}>Airbag Piloto Nissan Versa,Sentra {'\n'}
                    $300.00</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/imagen3.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}> Tapa Airbag Piloto Chevrolet Sail 
                    {'\n'}$55.00</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/imagen4.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}> Airbag Piloto Kia Cerato, Forte  {'\n'}
                    $300.00</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/imagen5.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}>Airbag Piloto Kia Sportage R {'\n'}
                    $300.00</Text>
                </View>
                <View style={styles.imageTextContainer}>
                    <Image
                        source={require('../../../../assets/img/imagen6.png')}
                        style={styles.image}
                    />
                    <Text style={styles.imageText}>Airbag Piloto Renault Logan {'\n'}
                    $300.00</Text>
                </View>
            </View>
            {currentUser && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={goToAddRestaurant}
                />
            )}
        </View>
    );
}