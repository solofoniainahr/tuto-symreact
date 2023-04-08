import axios from 'axios'
import jwtDecode from 'jwt-decode';
//import CustomersAPI from './customersAPI';

/**
 * Position le token JWT  sur axios
 * @param {String} token Le JWT token 
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer "+token; 
}

/**
 * Mis en place(token etc) lors de chargement de l'application
 */
function setUp(){
    //1. Voir si on a un token
    const token = window.localStorage.getItem("authToken")
    //console.log(token)
    //2. Si le token est encore valide 
    if ( token ) {
        const {exp: expiration} = jwtDecode(token)
        if ( expiration * 1000 > new Date().getTime()) {
             setAxiosToken(token)
            console.log("connexion établie avec axios")         
        }else{
            logOut();
        }
    }
    else {
        logOut();
    }
}

/**
 * Deconnexion(Suppression du token dans localStorage et sur Axios)
 */
function logOut(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    //CustomersAPI.findAll().then(console.log)
}

/**
 * Requete HTTP d'authentification et stockage de token dans le storage et sur Axios
 * @param {object} credentials 
 * @returns 
 */
function authenticate(credentials){
    //Récuperer le token
    return axios.post('http://localhost:8000/api/login_check', credentials)
    .then(response => response.data.token)
    .then(token => {
        //Stocker le token dans le localStorage(Navigateur)
        window.localStorage.setItem("authToken", token);
        //On previent Axios qu'on a maintenant un header par defaut sur toutes nos futurs requetes HTTP
        //axios.defaults.headers["Authorization"] = "Bearer "+token;
        setAxiosToken(token)

        //Juste pour tester si la requete marche très bien
        //const data = await customersAPI.findAll()
        //Pour tester la deconnxion
      //  CustomersAPI.findAll().then(console.log)
    } );

}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 */
function isAuthenticated(){
    //1. Voir si on a un token
    const token = window.localStorage.getItem("authToken")
    console.log(token)
    //2. Si le token est encore valide 
    if ( token ) {
        const {exp: expiration} = jwtDecode(token)
        if ( expiration * 1000 > new Date().getTime()) {
            
            return true;
        }

        return false;
    }

    return false;
}

export default {
    authenticate,
    logOut,
    setUp,
    isAuthenticated
}