import axios from "axios"
import { isAuthenticated } from "./auth.helper"
const API = process.env.REACT_APP_DB_API

export const getUserDataApi = async () =>{
    const token = isAuthenticated()
    const config = {headers:{Authorization: `Bearer ${token}`}}
    return await  axios.get(`${API}/user`, config)
}