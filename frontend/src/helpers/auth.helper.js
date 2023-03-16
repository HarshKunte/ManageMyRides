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

export const login = async (data) =>{
        return await axios.post(`${API}/auth/login`, data)
        .then(res => {
            if(res.data?.success){
                // save token to local storage
                authenticate(res.data?.token,()=>{})
            }
            return res
        })       
}