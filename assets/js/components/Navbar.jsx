import React, {useContext} from 'react'
import AuthAPI from '../services/AuthAPI';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

//Si on n'utilise pas context
{/*const Navbar = ({isAuthenticate, onLogout, history}) => {*/}
const Navbar = ({history}) => {

    const {isAuthenticate, setIsAuthenticate } = useContext(AuthContext)

    const handleLogout = () => {
        AuthAPI.logOut();
        //onLogout(false);
        setIsAuthenticate(false);
        toast.success("Vous êtes déconnecté ");
        history.push('/login')
    }
    return ( 
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Symfony Reactjs</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                        
                    </ul>
                    <ul className='navbar-nav ml-auto'>
                        {(!isAuthenticate && 
                            <>
                                <li className='nav-item'>
                                    <NavLink to="/register" className='nav-link'>Inscription</NavLink>
                                </li>   
                                <li className='nav-item'>
                                    <NavLink to="/login" className='btn btn-success'>Connexion!</NavLink>
                                </li>
                            </>) || (
                                <li className='nav-item'>
                                    <button onClick={handleLogout} className='btn btn-danger'>Deconnexion!</button>
                                </li>
                            )
                        }
                        
                    </ul>
                
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;