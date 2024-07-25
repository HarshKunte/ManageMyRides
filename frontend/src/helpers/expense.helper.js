import axios from 'axios'
import { isAuthenticated } from './auth.helper'
import { config } from '../config';
const API = config.REACT_APP_DB_API

export async function getAllFuelExpenses(limit, skipCount){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/expenses/fuel/${limit}/${skipCount}`, config)
}
export async function getAllOtherExpenses(limit, skipCount){
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/expenses/other/${limit}/${skipCount}`, config)
}

export const getFilteredFuelExpenses = async (startDate, endDate, limit, skipCount) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/expenses/fuel/filter/${startDate}/${endDate}/${limit}/${skipCount}`, config)
  }

export const getFilteredOtherExpenses = async (startDate, endDate, limit, skipCount) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.get(`${API}/expenses/other/filter/${startDate}/${endDate}/${limit}/${skipCount}`, config)
  }

export const createFuelExpense = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.post(`${API}/expense/fuel`,data, config)
}
export const createOtherExpense = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.post(`${API}/expense/other`,data, config)
}

export const deleteFuelExpense = async (id) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.delete(`${API}/expense/fuel/${id}`, config)
}
export const deleteOtherExpense = async (id) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.delete(`${API}/expense/other/${id}`, config)
}