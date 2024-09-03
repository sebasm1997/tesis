import { View,  } from 'react-native'
import React from 'react'
import {Image} from "react-native-elements"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {styles} from "./RegisterScreen.styles"
import {RegisterFrom} from "../../../components/Auth"

export  function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
     
        <View style={styles.content}/>
        <RegisterFrom/>
    </KeyboardAwareScrollView>
  )
}