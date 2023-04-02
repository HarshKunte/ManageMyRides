import axios from "axios"
import { isAuthenticated } from "./auth.helper"
import { config } from '../config';
const API = config.REACT_APP_DB_API

export const getUserDataApi = async () =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await  axios.get(`${API}/user`, config)
}

export const editUserData = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await  axios.put(`${API}/user`,data, config)
}

export const changePassword = async (data) =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await axios.post(`${API}/auth/password/change`, data, config)
}