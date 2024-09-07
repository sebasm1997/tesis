
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListadoScreen } from "../screens/RankingScreen";
import { DetalleScreen } from "../screens/SearchScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ListadoStarck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.Listado.ranking}
        component={ListadoScreen}
        options={{ title: "Listas de ordenes" }}
      />
        <Stack.Screen
        name={screen.Detalle.search}
        component={DetalleScreen}
        options={{ title: "Detalles de la orden " }}
      />
      
      
    </Stack.Navigator>
  );
}