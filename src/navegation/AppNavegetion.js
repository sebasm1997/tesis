import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { ProductoStarck } from "./RestaurantStack";
import { CarroStarck as CarroStarck } from "./FavoritesStack";
import { ListadoStarck as ListadoStarck } from "./RinkingStarck";
import { DetalleStarck as DetalleStarck } from "./SearchStarck";
import { CuentaStarck as CuentaStarck } from "./AccountsStarck";
import { screen } from "../utils";
import React, { useState, useEffect,  } from "react";
import { getData } from "../utils/authStorage";

const Tab = createBottomTabNavigator();

export function AppNavegetion() {


  return (
    <Tab.Navigator
      initialRouteName={screen.Cuenta.tab}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "#424141",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >

     <Tab.Screen 
name={screen.Prouctos.tab} 
component={ProductoStarck} 
options={{title:"Productos"}}
/>   

<Tab.Screen
 name={screen.Carro.tab}
 component={CarroStarck}
options={{ title: "Carro" }}
      />

<Tab.Screen 
name={screen.Listado.tab} 
component={ListadoStarck}
options={{title:"Listado "}}
/> 
{/* 
<Tab.Screen 
name={screen.Detalle.tab} 
component={DetalleStarck}
options={{title:"Detalle de Orden"}}
/>  */}




<Tab.Screen 
name={screen.Cuenta.tab} 
component={CuentaStarck} 
options={{title:"Cuenta"}}
/> 
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.Prouctos.tab) {
    iconName = "compass-outline";
  } else if (route.name === screen.Carro.tab) {
    iconName = "cart";
  } else if (route.name === screen.Listado.tab) {
    iconName = "account-details-outline";
  } else if (route.name === screen.Detalle.tab) {
    iconName = "account-box";
  } else if (route.name === screen.Cuenta.tab) {
    iconName = "account";
  }
  

  return (
    
    <Icon
    type="material-community"
    name={iconName}  // Nombre cambiado a "tomato"
    color={color} // Color tomate aplicado
    size={size}
  />
  );
}