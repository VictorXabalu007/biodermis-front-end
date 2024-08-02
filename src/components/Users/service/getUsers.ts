import { USERS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";



export const getUsers = async () => {

 
    const headers = getHeaders();

    const req = await api.get('/usuarios/0',{
        headers,
    });


    if(req.data && Array.isArray(req.data)){

        sessionStorage.setItem(USERS_DATA, JSON.stringify(req.data))
        
    } 
    
    return req.data

}