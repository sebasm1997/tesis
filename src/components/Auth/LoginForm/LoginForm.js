import { View,Text  } from 'react-native'
import React, {useEffect, useState} from 'react'
import {initialValues,validationSchema} from "./LoginFrom.data"
import {Input,Icon,Button} from "react-native-elements"
import Toast from 'react-native-toast-message'
import {useNavigation} from "@react-navigation/native"
import {screen} from "../../../utils"
import {useFormik} from "formik"
import {styles} from "./LoginForm.syles"
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";




export function LoginForm() {

  const loginMutation_todo = gql`
  mutation LoginMutation($username: String!,$password: String!){
  login(loginUserInput:
    {
      username: $username,
      password: $password,
    }
  ){
    access_token,
    email
  }
}
`;
  
  const [showPassword, setshowPassword]= useState(false);
  const [loginMutation, { data, loading, error }] = useMutation(loginMutation_todo);
  const navigation=useNavigation();


  useEffect(() => {
    if (data) {
      console.log(data)
      const storeUserData = async () => {
        try {
          const decoded = jwtDecode(data.login.access_token);
          
          await AsyncStorage.setItem('access_token', data.login.access_token);
          
          await AsyncStorage.setItem('email', data.login.email);
          await AsyncStorage.setItem('user_id', ''+decoded.sub);
  
          navigation.navigate(screen.Prouctos.restaurants);
        } catch (error) {
          console.log('Error guardando los datos:', error);
        }
      };
  
      storeUserData();
    }
  }, [data]);

  const onshowHidenPassword= () =>setshowPassword((prevState)=>!prevState);
  const formik = useFormik({

    initialValues: initialValues(),
    validationSchema:validationSchema(),
    validateOnChange:  false,
    onSubmit: async (formValue) => {

      try {
        // formValue.email,
          // formValue.password
        
          
          
          loginMutation({ variables: { username:  formValue.email, password: formValue.password } });


        //navigation.navigate(screen.Accouns.accouns);
      } catch (error) {
        Toast.show({

          type:"error",
          position:"bottom",
          text1:"Usuario incorrecto"
        })
        console.log(error);
      }

    }})

  return (
    <View style={styles.content}>
  <Input
    placeholder="Correo electrónico"
    containerStyle={styles.input}
    inputStyle={styles.inputText}
    rightIcon={
      <Icon type="material-community" name="at" iconStyle={styles.icon} />
    }
    onChangeText={(text) => formik.setFieldValue("email", text)}
    errorMessage={formik.errors.email}
  />
  <Input
    placeholder="Contraseña"
    containerStyle={styles.input}
    inputStyle={styles.inputText}
    secureTextEntry={showPassword ? false : true}
    rightIcon={
      <Icon
        type="material-community"
        name={showPassword ? "eye-off-outline" : "eye-outline"}
        iconStyle={styles.icon}
        onPress={onshowHidenPassword}
      />
    }
    onChangeText={(text) => formik.setFieldValue("password", text)}
    errorMessage={formik.errors.password}
  />
  <Button
    title="Iniciar sesión"
    containerStyle={styles.btnContainer}
    buttonStyle={styles.btn}
    onPress={formik.handleSubmit}
    loading={formik.isSubmitting || loading}
  />
  {error && <Text style={styles.errorText}>{error.message}</Text>}
</View>
  );
}