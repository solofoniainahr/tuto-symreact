import React, {useContext, useState} from 'react'
import customersAPI from '../services/customersAPI'
import AuthAPI from '../services/AuthAPI'
import AuthContext from '../context/AuthContext'
import Field from '../components/form/Field'

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
                <Field 
                    label="Adresse email" 
                    type='email' placeholder='Adresse email de connexion' 
                    name='username' onChange={handleChange} 
                    value={credentials.username} error={error} />

                <Field
                    label='Mot de passe'
                    type='password' placeholder='Mot de passe'
                    name='password' onChange={handleChange}
                    value={credentials.password} 
                />
               
                <div className='form-group mt-2'>
                    <button type='submit' className='btn btn-success'>Connecter</button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;