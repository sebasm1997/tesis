import React from 'react';
import { View, ScrollView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScree.styles";

export function LoginScree() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.accounts.register);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        source={require("../../../../assets/img/tienda-removebg-preview.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}