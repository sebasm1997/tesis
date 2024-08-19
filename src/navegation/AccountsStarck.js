import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {AccountScreen } from "../screens/Account/AccounstScreen";
import {LoginScree} from "../screens/Account/LoginScreen"
import { screen } from "../utils";
import {RegisterScreen} from "../screens/Account/RegisterScreen"

const Stack = createNativeStackNavigator();

export function AccounsStarck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.accouns.accouns}
        component={AccountScreen}
        options={{ title: "Cuenta" }}
      />
       <Stack.Screen
        name={screen.accouns.login}
        component={LoginScree}
        options={{ title: "Iniciar sesion" }}
      />

<Stack.Screen
        name={screen.accouns.register}
        component={RegisterScreen}
        options={{ title: "Crea tu cuenta" }}
      />
    </Stack.Navigator>
  );
}