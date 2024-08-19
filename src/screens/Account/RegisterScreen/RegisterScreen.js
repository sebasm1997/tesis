import { View,  } from 'react-native'
import React from 'react'
import {Image} from "react-native-elements"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {styles} from "./RegisterScreen.styles"
import {RegisterFrom} from "../../../components/Auth"

export  function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
        />
        <View style={styles.content}/>
        <RegisterFrom/>
    </KeyboardAwareScrollView>
  )
}