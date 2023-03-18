export const isAuthenticated = () => {

    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        const {expires_in, data} = JSON.parse(localStorage.getItem("jwt"))
        
        if(Date.now() > expires_in){
            localStorage.removeItem("jwt")
            return false
        }
        return data;
    }
    else {
        return false
    }
}

