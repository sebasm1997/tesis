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
  const navigation=useNavigation()


  useEffect(()=>{
    if (data){
      navigation.navigate(screen.Cuenta.accouns);
    }

  },[data])

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
        rightIcon={
          <Icon type="material-community"
           name="at" 
           iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email",text)}
        errorMessage={formik.errors.email}
      />
      <Input
         placeholder="Contraseña"
         containerStyle={styles.input}
         secureTextEntry={showPassword ? false: true}
         rightIcon={
           <Icon
             type="material-community"
             name={showPassword ? "eye-off-outline": "eye-outline"}
             iconStyle={styles.icon}
             onPress={onshowHidenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password",text)}
            errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
         loading={formik.isSubmitting || loading}
      />
      {
        error && <Text> {error.message}</Text>
      }

    </View>
  );
}