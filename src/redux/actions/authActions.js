import Axios from "axios";
import { API } from '../../config/API';

export const loginAction = (loginValues) => {
    API.post("oauth/token", loginValues).then(response => {
        // Als die call lukt doen we 3 dingen:

        // We slaan de token op in localstorage, dit zodat we na het herladen van de pagina nog steeds verder kunnen
        // met deze token. In API.js stellen we deze token onmiddellijk in bij het inladen van de pagina als deze
        // beschikbaar is
        window.localStorage.setItem("LOGIN_OAUTHTOKEN", response.data.access_token);

        // Om vanaf nu onze API requests te voorzien van een token moeten we dit als volgt instellen.
        // Volgende refresh is dit niet meer nodig want dan doen we exact dit in de API.js
        API.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

        // Na het juist instellen van alles kunnen we gaan ophalen wie er is ingelogd om dit dan weer te geven op
        // de pagina
        getUserData();
    });
}

export const registerAction = (registerValues) => {
    API.post("api/users", registerValues).then(response => {
        // ---------------Nog redirecten nar login page
        alert(response.statusText);
    });
}

export const getUserData = () => {

    return function(dispatch){
        console.log("test");
        API.get("api/user").then(response => {
           dispatch({
               type: "SET_USER_DATA",
               payload: response.data
           });
        });
    }
}
