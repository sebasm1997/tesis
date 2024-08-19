import React, { useState, useEffect } from "react";
import {UserLoggedScreen} from "./UseLoggedScree";
import {UserGuestScreen} from "./UserGuestScreen"
import {LoadingModal} from "../../components"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function AccountScreen() {
    const [hasLogged, setHasLogged] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false);
        });
    }, []);

   if (hasLogged == null) {
        return <LoadingModal show text="Cargando"/>
 }

   return  hasLogged ? < UserLoggedScreen/> : <UserGuestScreen/>
}