import axios from 'axios'
import { isAuthenticated } from './auth.helper'
const API = process.env.REACT_APP_DB_API


export const createTransaction = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    await axios.post(`${API}/transaction`,data, config)
}