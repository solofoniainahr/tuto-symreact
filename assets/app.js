import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './js/components/Navbar';
import CustomersPage from './js/pages/CustomersPage';
import HomePage from './js/pages/HomePage';
import InvoicesPages from './js/pages/InvoicesPages';

import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from './js/pages/LoginPage';

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import PrivateRoute from './js/components/PrivateRoute';
import AuthContext from './js/context/AuthContext';
import AuthAPI from './js/services/AuthAPI';




//console.log("hello world!!!")
AuthAPI.setUp();

const App = () => {
    //TODO: il faudrait par défaut qu'on demande à notre AuthAPI si on est connecté ou pas
    const [isAuthenticate, setIsAuthenticate] = useState(AuthAPI.isAuthenticated());
    //console.log(isAuthenticate)

    const NavbarWithRouter = withRouter(Navbar)

    //recupérartion des données utilisées par le context
    /*const contextValue = {
        isAuthenticate,
        setIsAuthenticate
    }*/
    return (
        <AuthContext.Provider value={{
            isAuthenticate,
            setIsAuthenticate
        }}>

            <HashRouter>
                {/*<Navbar isAuthenticate={isAuthenticate} onLogout={setIsAuthenticate}/> Pas de composent withRouter*/}
                {/*<NavbarWithRouter isAuthenticate={isAuthenticate} onLogout={setIsAuthenticate}/>*/}
                <NavbarWithRouter />
                <main className='container pt-5'>
                    <Switch>
                        <Route path="/login" 
                            render={props => (
                            <LoginPage onLogin={setIsAuthenticate}
                            {...props} />
                        )} />
                        {/**la seul composent qui eut donné history c'est la route */}
                        {/*<Route path="/login" component={LoginPage} />*/}
                        {/*<Route path="/invoices" component={InvoicesPages} />
                        <Route path="/customers" component={CustomersPage} /> Route non proteger*/}
                        
                        <Route 
                            path="/invoices"
                            render={props => {
                                return isAuthenticate ? (<InvoicesPages {...props}/>) : (<Redirect to="/login" />)
                            }}
                        />
                        

                        {/**debut sans context */}
                        {/*<PrivateRoute isAuthenticate={isAuthenticate} path="/customers" component={CustomersPage} />*/}
                        {/**Fin Avec context */}

                        {/**Debut avec context */}
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        {/**Fin avec context */}
                        {/**Switch with condition simple */}
                        {/*<Route 
                            path="/customers"
                            render={props => {
                                if( isAuthenticate ) return <CustomersPage {...props} />
                                else return <Redirect to="/login" />
                            }} 
                        />*/}
                        <Route path="/" component={HomePage} />
                    </Switch>
                    
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
}


const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);