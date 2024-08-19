import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Restaurants} from "../screens/Restaurants/RestaurantsScreen/RestaurantsScreens";
import {AddRestauranScreen} from "../screens/Restaurants/AddRestaurantScreen/AddRestauranScreen";
import {screen} from "../utils";

const Stack = createNativeStackNavigator();

export function RestaurantStrack (){

 return (

    <Stack.Navigator>
<Stack.Screen
    name={screen.restaurants.restaurants}
    component={Restaurants}
    options={{title: "Productos"}}

/>
<Stack.Screen
    name={screen.restaurants.addRestaurant}
    component={AddRestauranScreen}
    options={{title: "Nuevo Restaurantes"}}

/>


    </Stack.Navigator>

 );


 };