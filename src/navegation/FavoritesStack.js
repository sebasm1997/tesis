import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Favorites } from "../screens/FavoritesScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function FavoritesStarck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.favorites.favorites}
        component={Favorites}
        options={{ title: "Detalles del producto" }}
      />
    </Stack.Navigator>
  );
}