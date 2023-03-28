import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersAPI from '../services/customersAPI';
import { async } from 'regenerator-runtime';



const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')

    //Permet d'aller récuperes des customers
    const fetchCustomers = async () => {
        try {
            const customerList = await CustomersAPI.findAll()
            setCustomers(customerList)
        } catch (error) {
            console.log(error.response)
        }
    }

    //Au chargement du composant on va chercer du customers
    useEffect(() => {
        fetchCustomers()
        //CustomersAPI.findAll()        
             //.then(data => setCustomers(data))
             //.catch(error => error.response)
             //.then(data => setCustomers(data))
    }, [])

    //Gestion de suppresson d'un client
    const handleDelete = async (customerId) => {
        const copyOriginalCustomers = [...customers] 

        //1. L'approche optimiste
        setCustomers(customers.filter(customer => customer.id != customerId))
       
        try{
            await CustomersAPI.deleteCustomer(customerId)
        }
        catch(error){
            setCustomers(copyOriginalCustomers)
        }

        //Deuxieme fa-on de faire une requete(traitement de promesse)
        //2. l'approche pessimiste
        //CustomersAPI.deleteCustomer
        //.then(response => console.log("suppresion ok"))
        //.then(response => customers.filter(customer => customer.id != customerId))
        //.catch(error => {
            //setCustomers(copyOriginalCustomers)
            //console.log(error.response)
        //})
                
    }

    /** pagination */
    const itemPerPage = 5;
    
    const filteredCustomers = customers.filter (c => 
                                (c.company && c.company.toLowerCase().includes(search.toLowerCase()) ||
                                c.lastName.toLowerCase().includes(search.toLowerCase()) || 
                                c.firstName.toLowerCase().includes(search.toLowerCase())) || 
                                c.email.toLowerCase().includes(search.toLowerCase())  
                                ) 
    
    /*Avec recherche dans une page autre que le premiere page */                             
    /*const paginatedCustomers = filteredCustomers.length > itemPerPage ? 
                                    Pagination.getData(
                                        filteredCustomers,  
                                        //customers, 
                                        currentPage, 
                                        itemPerPage) : 
                                    filteredCustomers;*/
    //Pagination des customers
    const paginatedCustomers = Pagination.getData(
        filteredCustomers, 
        //customers, 
        currentPage, 
        itemPerPage)

    const handleChangePage = (page) => setCurrentPage(page)

    const handleSearch = ({currentTarget}) => {
        const txtSearch = currentTarget.value;
        setSearch(txtSearch)
        setCurrentPage(1)
    }

    return ( 
        <>
            <h1>Liste des clients</h1>
            {/**Début Recherche */}
            <div className='form-group'>
                <input  type='text'
                        className='form-control' 
                        placeholder='Rechercher ...'
                        value={search}
                        onChange={handleSearch}/>
            </div>
            {/**Fin Recherche */}

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className='text-center'>Factures</th>
                        <th className='text-center'>Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        paginatedCustomers.map( (customer) => 
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>
                                    <a href='#'>{customer.firstName} {customer.lastName}</a>
                                </td>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td className='text-center'>
                                    <span className='badge rounded-pill bg-secondary'>
                                        {customer.invoices.length}
                                    </span>
                                </td>
                                <td className='text-center'>{customer.totalAmount.toLocaleString()} €</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(customer.id)} 
                                        disabled={customer.invoices.length > 0} 
                                        className='btn btn-sm btn-danger'
                                        >Supprimer</button>
                                </td>
                            </tr>
                        ) 
                    }
                </tbody>
            </table>
            {/** Pagination */}
            {itemPerPage < filteredCustomers.length && <Pagination currentPage={currentPage} 
                        itemPerPage={itemPerPage} 
                        //length={customers.length} 
                        length={filteredCustomers.length} 
                        onPageChanged={handleChangePage}/>
                }
            
        </>
     );
}
 
export default CustomersPage;