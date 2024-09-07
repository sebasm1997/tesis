import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CarroScrenn } from "../screens/FavoritesScreen";
import {ViewRestaurantScreen as ViewProuctosScreen} from "../screens/Restaurants/ViewRestaurantScreen/ViewRestaurantScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function CarroStarck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.Carro.carro}
        component={CarroScrenn}
        options={{ title: "Carro" }}
      />
    </Stack.Navigator>
  );
}