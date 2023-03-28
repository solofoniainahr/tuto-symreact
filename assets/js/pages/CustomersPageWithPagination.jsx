import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Pagination from '../components/Pagination';

const CustomersPageWithPagination = (props) => {
    const itemPerPage = 5;
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        //axios.get(`http://localhost:8000/api/customers/`)
        axios.get(`http://localhost:8000/api/customers?pagination=true&count=${itemPerPage}&page=${currentPage}`)
            .then(response => 
                {
                    
                    setCustomers(response.data["hydra:member"])
                    setTotalItem(response.data["hydra:totalItems"])
                    setLoading(false)
                    
                }
            )
            //Modification
            //.then(response => response.data['hydra:member'])
            //.then(data => setCustomers(data))
            .catch(error => error.response)
             //.then(data => setCustomers(data))
    }, [currentPage])
    
    const handleDelete = (customerId) => {
        const copyOriginalCustomers = [...customers] 

        //1. L'approche optimiste
        setCustomers(customers.filter(customer => customer.id != customerId))
        //2. l'approche pessimiste
        axios.delete("http://localhost:8000/api/customers/"+customerId)
            .then(response => console.log("suppresion ok"))
            //.then(response => customers.filter(customer => customer.id != customerId))
            .catch(error => {
                setCustomers(copyOriginalCustomers)
                console.log(error.response)
            })
                
    }

    /** pagination */
    
    const paginatedCustomers = Pagination.getData(
                                        customers, 
                                        currentPage, 
                                        itemPerPage)

    const handleChangePage = (page) => {
        //setCustomers([])
        setLoading(true)
        setCurrentPage(page)
    }
    console.log(customers)
    return ( 
        <>
            <h1>Liste des clients (pagination)</h1>
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
                    { loading && (
                        <tr><td>Chargement ...</td></tr>
                    )}
                    { 
                        //paginatedCustomers.map( (customer) => 
                        !loading && customers.map( (customer) => 
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
            <Pagination currentPage={currentPage} 
                        itemPerPage={itemPerPage} 
                        length={totalItem} 
                        //length={customers.length} 
                        onPageChanged={handleChangePage}/>
            
        </>
     );
}
 
export default CustomersPageWithPagination;