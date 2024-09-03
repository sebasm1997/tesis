import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {CuentaScreen } from "../screens/Account/AccounstScreen";
import {LoginScree} from "../screens/Account/LoginScreen"
import { screen } from "../utils";
import {RegisterScreen} from "../screens/Account/RegisterScreen"

const Stack = createNativeStackNavigator();

export function CuentaStarck() {
  return (
    <Stack.Navigator>
             <Stack.Screen
        name={screen.Cuenta.login}
        component={LoginScree}
        options={{ title: "Iniciar sesion" }}
      />
      <Stack.Screen
        name={screen.Cuenta.accouns}
        component={CuentaScreen}
        options={{ title: "Cuenta" }}
      />


<Stack.Screen
        name={screen.Cuenta.register}
        component={RegisterScreen}
        options={{ title: "Crea tu cuenta" }}
      />
    </Stack.Navigator>
  );
}