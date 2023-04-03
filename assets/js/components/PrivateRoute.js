
import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/AuthContext'



const PrivateRoute = ({path, component}) => {
    //Recuperer des donnée isAuthenticate viens de context
    const {isAuthenticate} = useContext(AuthContext)
    return isAuthenticate ? (<Route path={path} component={component} />) : <Redirect to="/login" />
}
 
export default PrivateRoute;