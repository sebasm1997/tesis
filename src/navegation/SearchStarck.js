import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetalleScreen } from "../screens/SearchScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function DetalleStarck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.Detalle.search}
        component={DetalleScreen}
        options={{ title: "Detalles de las ordenes " }}
      />
    </Stack.Navigator>
  );
}