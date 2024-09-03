import React, {useState} from 'react'
import { View } from 'react-native'
import { Input, Icon,Button} from "react-native-elements"
import {useFormik} from "formik"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {useNavigation} from "@react-navigation/native"
import {screen} from "../../../utils"
import Toast from 'react-native-toast-message'
import {initialValues, validationSchema} from "./RegisterFrom.data"
 import {styles} from "./RegisterFrom.styles"



export  function RegisterFrom() {

  const [showPassword, setshowPassword]= useState(false);
  const navigation= useNavigation();

         const formik = useFormik({

          initialValues: initialValues(),
          validationSchema:validationSchema(),
          validateOnChange:  false,
          onSubmit: async (formValue) =>{
            try {
              const auth = getAuth();
              await createUserWithEmailAndPassword(
                auth,
                formValue.email,
                formValue.password
              );
              navigation.navigate(screen.Cuenta.accouns);
            }catch (error) {
              Toast.show({

                type:"error",
                position:"bottom",
                text1:"Error al registrarse, intente mastarde"
              })
              console.log(error);
            }

          }
         })


         const showHidenPassword= () =>setshowPassword((prevState)=>!prevState);



    return (
        <View style={styles.content}>
          <Input
            placeholder="Correo electrónico"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="at"
                iconStyle={styles.icon}
              />
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
                onPress={showHidenPassword}
              />
            }
            onChangeText={(text) => formik.setFieldValue("password",text)}
            errorMessage={formik.errors.password}
          />
          <Input
            placeholder="Repetir contraseña"
            containerStyle={styles.input}
            secureTextEntry={showPassword ? false: true}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline": "eye-outline"}
                iconStyle={styles.icon}
                onPress={showHidenPassword}
              />
            }
            onChangeText={(text) => formik.setFieldValue("repeatPassword",text)}
            errorMessage={formik.errors.repeatPassword}
          />
          <Button
            title="Unirse"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      );
}