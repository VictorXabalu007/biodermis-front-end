
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";



export const getUsers = async () => {

 
    const headers = getHeaders();

    const req = await api.get('/usuarios/0',{
        headers,
    });

    return req.data

}