import { Favorites } from "../screens/FavoritesScreen"
import { Restaurants } from "../screens/Restaurants/RestaurantsScreen/RestaurantsScreens"

const restaurantStrack ={
   
   tab: "RestaurantsTab",
   restaurants:"Restarants",
   addRestaurant:"AddRestaurant",

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

    restaurants: restaurantStrack,
    favorites : favoritesStrack ,
    ranking: rankingStrack,
    search: searchStrack,
    accouns: accounsStrack,

};




