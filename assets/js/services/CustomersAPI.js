import axios from 'axios'

function findAll(){
    return axios.get("http://localhost:8000/api/customers")
             .then(response => response.data['hydra:member'])
}


function deleteCustomer(customerId) {
    return axios.delete("http://localhost:8000/api/customers/"+customerId)
}

function findCustomer(id){
    return axios.get("http://localhost:8000/api/customer/"+id).then(response => response.data);
}

function update(id, customer){
    return axios.put("http://localhost:8000/api/customers/"+id, customer);
}
export default{
    findAll,
    deleteCustomer,
    findCustomer,
    update
}