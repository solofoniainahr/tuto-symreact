import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/form/Field';


const CustomerPage = ({match, history}) => {

    const [editing, setEditing] = useState(false);
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "", 
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "", 
        company: ""
    })

    //Get parameter id in url
    const {id = "new"} = match.params;

    //récupere Uun client
    const fecthCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await axios.get("http://localhost:8000/api/customers/"+id).then(response => response.data) 
            
            
            setCustomer({firstName, lastName, email, company});
            //console.log(data)
        } catch (error) {
            //console.log(error.response)
            //Todo : Notification flash d'une erreur
            //history.replace("/customers")
        }
    }

    //Chargement du composant si besoin au chargement du composant ou au changement de l'identification
    useEffect(() => {
        if( id !== "new" ){
            //caster sting en nombre ajouter +devant la variable +id

            //console.log(+id)
            setEditing(true);
            fecthCustomer(id);
        }
    }, [])


    //Gestion des changement des inputs dans les formulaire
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        
        setCustomer({...customer, [name]: value})
        

        //const value = currentTarget.value;
        //const name = currentTarget.name;

        //setCredentials({...credentials, [name]: value})
    }

    //Gestion de soumission de formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(customer)

        try {
            if ( editing ) {
                const response = await axios.put("http://localhost:8000/api/customers/"+id, customer);
                //console.log(response.data)
                //Todo : Flash notification de succès
            }
            else {
                const response = await axios.post("http://localhost:8000/api/customers", customer)

                //Todo flash otification de succès
                history.replace("/customers")
            }
            //console.log(response.data)
            setErrors({})
            setCustomer({
                lastName: "",
                firstName: "",
                email: "", 
                company: ""
            })
        
        } catch (error) {
            //console.log(error.response.data.violations)
            if( error.response.data.violations ){
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                console.log(apiErrors)
                setErrors(apiErrors)
                //Todo notification d'erreur
            }
        }
    }
    return ( 
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification d'un client</h1>}
            {/**!editing ? (<h1>Création d'un client</h1>) : (<h1>Modifictaion d'un client</h1>)*/}
            <form onSubmit={handleSubmit}> 
                <Field
                    onChange={handleChange}
                    value={customer.lastName}
                    label="Nom de  famille du client"
                    name="lastName"
                    placeholder='Nom de famille du client'
                    error={errors.lastName} 
                />
                <Field
                    onChange={handleChange}
                    value={customer.firstName}
                    label="Prénom"
                    name="firstName"
                    placeholder='Prénom du client'
                    error={errors.firstName} 
                />
                <Field
                    onChange={handleChange}
                    value={customer.email}
                    label="Email"
                    name="email"
                    placeholder='Adresse email du client'
                    type='email' 
                    error={errors.email}
                />
                <Field
                    onChange={handleChange}
                    value={customer.company}
                    label="Entreprise"
                    name="company"
                    placeholder='Entreprise du client'
                    error={errors.company} 
                />
                <div className='form-group mt-4'>
                    <button className='btn btn-success'>Enregistrer</button>
                    <Link to="/customers" className='btn btn-link'>Retour à la liste des clients</Link>
                </div>
            </form>
        </> 
    );
}
 
export default CustomerPage;