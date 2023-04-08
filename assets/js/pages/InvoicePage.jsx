import React, { useEffect, useState } from 'react'
import Field from '../components/form/Field';
import Select from '../components/form/Select';
import { Link } from 'react-router-dom';
import CustomersAPI from '../services/customersAPI';
import { async } from 'regenerator-runtime';
import axios from 'axios';


const InvoicePage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    //Gestion des changement des inputs dans les formulaire
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setInvoice({...invoice, [name]: value})
        //const value = currentTarget.value;
        //const name = currentTarget.name;
        //setCredentials({...credentials, [name]: value})
    }

    const fetchClients = () => {
        try {
            const customersList =  CustomersAPI.findAll()
            //console.log("tets")
            setCustomers(customersList);
            
            console.log(clients)
        } catch (error) {
            console.log(error.response)
            
        }
    }

    useEffect( () => {
        fetchClients();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const id = +invoice.customer
            const response = await axios.post("http://localhost:8000/api/invoices", {
                ...invoice,
                customer: `/api/customers/${id}`
            })
            //console.log(invoice.customer)

        } catch (error) {
            console.log(error.response)
        }


        console.log(invoice.customer)
    }

    return ( 
        <>
            <h1>Création d'une facture</h1>
            <form onSubmit={handleSubmit}>
                <Field name="amount" 
                       type='number' placeholder='Montant de la facture' 
                       label="Montant" onChange={handleChange} 
                       value={invoice.amount} error={errors.amount}/>

                <Select 
                    name="customer" label="Client" 
                    value={invoice.customer} 
                    onChange={handleChange}
                    error={errors.customer}
                >
                    {/*
                        customers.map(customer => {
                            <option key={customer.id} value={customer.id}>{customer.lastName} {customer.firstName}</option>
                        }) 
                    */}
                    <option value="">Choisir un client</option>
                    <option key="84" value="84">Josepha2 Dupont</option>
                </Select>

                <Select 
                    name="status" label="Status" 
                    value={invoice.status} 
                    onChange={handleChange}
                    error={errors.status}
                >
                    <option value="CANCELLED">Annulée</option>
                    <option value="PAID">Payé</option>
                    <option value="SEND">Envoyée</option>
                </Select>

                <div className='form-group mt-3'>
                    <button className='btn btn-success'>Enregistrer</button>
                    <Link to="/invoices" className='btn btn-link'>Retour à la liste</Link>
                </div>
            </form>
        </>
     );
}
 
export default InvoicePage;