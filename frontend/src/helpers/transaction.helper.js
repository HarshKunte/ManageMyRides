import axios from 'axios'
import { isAuthenticated } from './auth.helper'
const API = process.env.REACT_APP_DB_API


export const createTransaction = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    await axios.post(`${API}/transaction`,data, config)
}

export async function getTransactionById(id){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    const resp =await axios.get(`${API}/transaction/${id}`, config)
    return resp
}

export async function deleteTransactionById(id){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.delete(`${API}/transaction/${id}`, config)
}