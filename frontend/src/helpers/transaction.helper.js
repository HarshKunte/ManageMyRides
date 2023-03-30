import axios from 'axios'
import { isAuthenticated } from './auth.helper'
const API = process.env.REACT_APP_DB_API


export const createTransaction = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.post(`${API}/transaction`,data, config)
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

export async function getAllTransactionsReport(){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/transactions/report`, config)
}

export async function deleteTransactionById(id){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.delete(`${API}/transaction/${id}`, config)
}


export function numberFormatter(num) {
    return Math.abs(num) > 9999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export function getFormatedStringFromDays(numberOfDays) {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    var yearsDisplay = years > 0 ? years + (years == 1 ? " year," : " years,") : "";
    var monthsDisplay = months > 0 ? months + (months == 1 ? " month," : " months,") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
    return yearsDisplay + monthsDisplay + daysDisplay; 
}