import axios from 'axios'
const API = "http://localhost:4000/api"
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}


export const signup = async (data) =>{
        return await axios.post(`${API}/auth/signup`, data)       
}