import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProductosScreens} from "../screens/Restaurants/RestaurantsScreen/RestaurantsScreens";
import {AddProuctosScreen} from "../screens/Restaurants/AddRestaurantScreen/AddRestauranScreen";
import {ViewRestaurantScreen as ViewProuctosScreen} from "../screens/Restaurants/ViewRestaurantScreen/ViewRestaurantScreen";
import {CarroScrenn} from "../screens/FavoritesScreen";
import {screen} from "../utils";

const Stack = createNativeStackNavigator();

export function ProductoStarck (){

 return (

    <Stack.Navigator>
<Stack.Screen
    name={screen.Productos.restaurants}
    component={ProductosScreens}
    options={{title: "Productos"}}

/>
<Stack.Screen
    name={screen.Productos.addRestaurant}
    component={AddProuctosScreen}
    options={{title: "Nuevo Producto"}}

/>
<Stack.Screen
    name={screen.Productos.viewRestaurant}
    component={ViewProuctosScreen}
    options={{title: "Producto"}}

/>
<Stack.Screen
        name={screen.Carro.carro}
        component={CarroScrenn}
        options={{ title: "Carro" }}
      />


    </Stack.Navigator>

 );


 };