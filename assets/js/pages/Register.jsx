import React, {useState} from 'react'
import Field from '../components/form/Field'
import { Link } from 'react-router-dom'
import axios from 'axios'
import async  from 'regenerator-runtime'

const Register  = (props) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    //Gestion des changement des inputs dans les formulaire
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        
        setUser({...user, [name]: value})
        

        //const value = currentTarget.value;
        //const name = currentTarget.name;

        //setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const apiErrors = {};
        if ( user.password !== user.passwordConfirm ) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas confirme !!";
            setErrors(apiErrors)

            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/users", user)
            setErrors({})
            props.history.replace("/login")
            //console.log(response)
            //Todo flash success
        } catch (error) {
            console.log(error.response)
            const {violations} = error.response.data;

            if ( violations ) {
                violations.forEach( violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
            <h1 className='text-center text-primary'>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName" 
                       label="Prénom" placeholder='Votre prénom' 
                       error={errors.firstName} 
                       onChange={handleChange} 
                       value={user.firstName} />
                
                <Field name="lastName" 
                       label="Nom" placeholder='Votre nom de famille' 
                       error={errors.lastName} 
                       onChange={handleChange} 
                       value={user.lastName} />

                <Field name="email" 
                       label="Adresse email" placeholder='Votre adresse email' 
                       error={errors.email} type="email"
                       onChange={handleChange} 
                       value={user.email} />
                
                <Field name="password" 
                       label="Mot de passe" placeholder='Votre mot de passe' 
                       error={errors.password} type="password"
                       onChange={handleChange} 
                       value={user.password} />
                
                <Field name="passwordConfirm" 
                       label="Confirmé mot de passe" placeholder='Confirmé votre mot de passe' 
                       error={errors.passwordConfirm} type="password"
                       onChange={handleChange} 
                       value={user.passwordConfirm} />

                <div className='form-group mt-3'>
                    <button className='btn btn-success'>Enregistrer</button>
                    <Link className='btn btn-link' to="/login">J'ai déjà un  compte</Link>
                </div>


            </form>
        </>
        );
}
 
export default Register;