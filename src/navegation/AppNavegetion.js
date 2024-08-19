import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements"; 
import {RestaurantStrack} from "./RestaurantStack";
import {FavoritesStarck} from"./FavoritesStack"
import {RinkingStarck} from "./RinkingStarck";


import {SearchStarck} from "./SearchStarck";
import {AccounsStarck} from "./AccountsStarck";
import { screen } from "../utils";



const Tab = createBottomTabNavigator();

export function AppNavegetion(){

return(
    <Tab.Navigator 
    
    screenOptions={({route})=>({

    headerShown:false,
     tabBarActiveTintColor: "#00a680",
     tabBarInactiveTintColor:"#646464",
     tabBarIcon: ({color,siza})=> screenOptions(route,color,siza),
    })}>

<Tab.Screen 
name={screen.restaurants.tab} 
component={RestaurantStrack} 
options={{title:"Productos"}}
/> 

<Tab.Screen
 name={screen.favorites.tab}
 component={FavoritesStarck}
options={{ title: "Detalles" }}
      />

<Tab.Screen 
name={screen.ranking.tab} 
component={RinkingStarck}
options={{title:"Listado "}}
/> 

<Tab.Screen 
name={screen.search.tab} 
component={SearchStarck}
options={{title:"Detalle de Orden"}}
/> 

<Tab.Screen 
name={screen.accouns.tab} 
component={AccounsStarck} 
options={{title:"Cuenta"}}
/> 

  
    </Tab.Navigator>
);

}

function screenOptions (route, color,siza){
let iconName;

if(route.name === screen.restaurants.tab){

   iconName = "compass-outline";
   }

if(route.name === screen.favorites.tab){

    iconName = "details";
    }
if(route.name === screen.ranking.tab){

     iconName = "format-list-bulleted";
        }
        
if(route.name === screen.search.tab){
        
     iconName = "receipt";
        }


if(route.name === screen.accouns.tab){
        
      iconName = "home-outline";
}




return(


<Icon 
     type="material-community" 
     name={iconName} 
     color={color} 
     siza={siza}
       />
)

}