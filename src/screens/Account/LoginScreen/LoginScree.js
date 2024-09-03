import React, { useState, useEffect,  } from "react";
import { View, ScrollView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { useIsFocused  } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScree.styles";
// import {StyleSheet} from "react-native"

import { getData, removeData } from "../../../utils/authStorage";
export function LoginScree() {

  const [logged, setLogged] = useState(false);
  const isFocused = useIsFocused();

  const getUserLogged = async () =>{
    const auth = await getData();
    if(auth){
      setLogged(true)
      console.log('Logged')
    }else{
      setLogged(false)
      console.log('NO LOGGED')
    }
}
const logout = async () =>{
   await removeData();
   setLogged(false)
}

useEffect(() => {
 
  if (isFocused) {
    console.log('INIT ')
    getUserLogged();
  }
  
    
},[isFocused]);


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