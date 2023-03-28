import axios from 'axios'

function findAll(){
    return axios.get("http://localhost:8000/api/customers")
             .then(response => response.data['hydra:member'])
}


function deleteCustomer(customerId) {
    return axios.delete("http://localhost:8000/api/customers/"+customerId)
}
export default{
    findAll,
    deleteCustomer
}