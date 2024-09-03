
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListadoScreen } from "../screens/RankingScreen";
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
      
      
    </Stack.Navigator>
  );
}