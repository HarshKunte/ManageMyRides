import axios from 'axios'
import { isAuthenticated } from './auth.helper'
const API = process.env.REACT_APP_DB_API


export const createTransaction = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    await axios.post(`${API}/transaction`,data, config)
}
export const editTransaction = async (data, id) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.put(`${API}/transaction/${id}`,data, config)
}

export async function getTransactionById(id){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/transaction/${id}`, config)
}

export async function getAllTransactions(limit, skipCount){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/transactions/${limit}/${skipCount}`, config)
}

export async function deleteTransactionById(id){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.delete(`${API}/transaction/${id}`, config)
}