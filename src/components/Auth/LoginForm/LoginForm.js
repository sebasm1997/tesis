import { View,  } from 'react-native'
import React, {useState} from 'react'
import {initialValues,validationSchema} from "./LoginFrom.data"
import {Input,Icon,Button} from "react-native-elements"
import Toast from 'react-native-toast-message'
import {useNavigation} from "@react-navigation/native"
import {screen} from "../../../utils"
import {useFormik} from "formik"
import {styles} from "./LoginForm.syles"
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'




export function LoginForm() {

  
  const [showPassword, setshowPassword]= useState(false);
  const navigation=useNavigation()

  const onshowHidenPassword= () =>setshowPassword((prevState)=>!prevState);
  const formik = useFormik({

    initialValues: initialValues(),
    validationSchema:validationSchema(),
    validateOnChange:  false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.accouns.accouns);
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
         loading={formik.isSubmitting}
      />
    </View>
  );
}