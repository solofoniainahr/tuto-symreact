import React, {useContext, useState} from 'react'
import customersAPI from '../services/customersAPI'
import AuthAPI from '../services/AuthAPI'
import AuthContext from '../context/AuthContext'

const LoginPage = ({ history}) => {
    const {setIsAuthenticate} = useContext(AuthContext)
    const [error, setError] = useState("")
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    //Gestion des champs
    //const handleChange = e => {
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        //const value = currentTarget.value;
        //const name = currentTarget.name;

        setCredentials({...credentials, [name]: value})

    }

    //Gestion du submit
    const handleSubmit = async e => {
        e.preventDefault()

        try {
             await AuthAPI.authenticate(credentials);
             setError('')
             setIsAuthenticate(true)
             //onLogin(true)
             history.replace("/customers")
        } catch (error) {
            console.log(error.response)
            setError('Aucun compte ne possède pas cette adresse email ou alors les informations ne correspondent pas !!')
            
        }
        console.log(credentials)
    }
    
    return ( 
        <>
            <h1>Connection à l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange} 
                        className={'form-control' +(error && ' is-invalid')} 
                        id='username' type='email' name="username"
                        placeholder="Adresse email de connexion" />
                    {  error && <p className='invalid-feedback'>
                        {error}
                    </p>
                    }
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input className='form-control' 
                           id='password' type='password' 
                           name='password' placeholder="Mot de passe"
                           value={credentials.password} onChange={handleChange} />
                </div>
                <div className='form-group mt-2'>
                    <button type='submit' className='btn btn-success'>Connecter</button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;