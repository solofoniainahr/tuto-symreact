import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { async } from 'regenerator-runtime';
import axios from 'axios'
import moment from 'moment/moment';
import InvoicesAPI from '../services/InvoicesAPI';
import { Link } from 'react-router-dom';


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée",
}


const InvoicesPages = (props) => {
    const [search, setSearch] = useState('')
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 5;
    
    //Gestion de format de date
    const formatDate = str => moment(str).format('DD/MM/YYYY');

    //Récupération des invoice au près de l'API
    const fetchInvoices = async () => {
        try{
            const data = await InvoicesAPI.findAll()
            setInvoices(data)
        }
        catch(error){
            //console.log(error.response)
        }
    }

    //Charger les invoices durant le chargement du composant
    useEffect(() => {
        fetchInvoices()
    }, [])
    
    //Recuperation du numero du page courant
    const onPageChanged = (page) => {
        setCurrentPage(page)
    }

    //Récuperation de critère de recherche
    const handleSearch = ({currentTarget}) => {
        const txtSearch = currentTarget.value;
        setSearch(txtSearch)
        setCurrentPage(1)
    }

    //Recherche des invoices
    const filteredInvoices = invoices.filter (i => 
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) || 
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) || 
        i.amount.toString().startsWith(search.toLowerCase())  
        //i.amount.toString().includes(search.toLowerCase())  
        )

    //Pagination des customers
    const paginatedInvoces = Pagination.getData(
        filteredInvoices, 
        //customers, 
        currentPage, 
        itemPerPage)
    
    //Gestion de suppression
    const handleDelete = async id => {
        const copyInvoices = [...invoices];
        //Pour la parte visuel
        setInvoices(invoices.filter(invoice => invoice.id !== id))

        try {
            //Suppression dans la partie back office
            await InvoicesAPI.deleteInvoice(id)
        } catch (error) {
            setInvoices(copyInvoices)
            console.log(error.response)
            
        }
    }
    return (
        <>
            <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h1>Listes des factures</h1>
                <Link className='btn btn-success' to="/invoices/new">Créer une facture</Link>
            </div>
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
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className='text-center'>Date d'envoi</th>
                        <th className='text-center'>Statut</th>
                        <th className='text-center'>Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoces.map( invoice => 
                        <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td>
                                <a href='#'>{invoice.customer.firstName} {invoice.customer.lastName}</a>
                            </td>
                            <td className='text-center'>{formatDate(invoice.sentAt)}</td>
                            <td className='text-center'>
                                <span className={"badge rounded-pill bg-"+STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                            </td>
                            <td className='text-center'>{invoice.amount.toLocaleString()} €</td>
                            <td>
                                <button className='btn btn-sm btn-primary mr-2'>Editer</button>
                                <button
                                    onClick={() => handleDelete(invoice.id)} 
                                    className='btn btn-sm btn-danger'>
                                        Supprimer 
                                </button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            {/**Pagination */}
            <Pagination currentPage={currentPage} 
                        itemPerPage={itemPerPage}
                        onPageChanged={onPageChanged}
                        length={filteredInvoices.length} />
        </>
    )
}

export default InvoicesPages;