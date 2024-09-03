import { Favorites } from "../screens/FavoritesScreen"
import { ProductosScreens } from "../screens/Restaurants/RestaurantsScreen/RestaurantsScreens"

const ProductoStarck ={
   
   tab: "RestaurantsTab",
   restaurants:"Restarants",
   addRestaurant:"AddRestaurant",
   viewRestaurant:"ViewRestaurant",

}
const favoritesStrack ={
    tab: "FavoritesTab",
    favorites:"Favotites",
    
 }
 const rankingStrack ={
    tab: "RankingTab",
    ranking : "Ranking",
 
 }
 const searchStrack ={
    tab: "SearchTab",
    search : "Search"
 
 }
 const accounsStrack ={
    tab: "AccounsTab",
    accouns : "Accouns",
    login: "Login",
    register: "Registro "
 
 }


export const screen= {

    Prouctos: ProductoStarck,
    favorites : favoritesStrack ,
    Listado: rankingStrack,
    Detalle: searchStrack,
    Cuenta: accounsStrack,

};




