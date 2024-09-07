import React, { useState, useEffect,  } from "react";
import { View, ScrollView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { useIsFocused  } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScree.styles";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {StyleSheet} from "react-native"

import { getData, removeData } from "../../../utils/authStorage";
export function LoginScree() {

  const [logged, setLogged] = useState(false);
//   const isFocused = useIsFocused();

  const getUserLogged = async () =>{
    const user = await AsyncStorage.getItem('email');

    if(user){
      setLogged(true)
    }else{
      setLogged(false)
    }
}
 const logout = async () =>{
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('email');
  setLogged(false)
}



useFocusEffect(
  useCallback(() => {
    getUserLogged();

    return () => {

    };
  }, [])
);


  return (
    <ScrollView style={styles.scrollView}>
      <Image
        source={require("../../../../assets/img/tienda-removebg-preview.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        {logged ?    
        <Button
        title="Cerrar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={()=> logout()}
      />
       : <LoginForm />}
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({

//   content: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 30,
//     },
//     input: {
//       width: "100%",
//       marginTop: 20,
//     },
//     icon: {
//       color: "#c1c1c1",
//     },
//     btnContainer: {
//       marginTop: 20,
//       width: "95%",
//     },
//     btn: {
//       backgroundColor: "#00a680",
//     },
  
// })