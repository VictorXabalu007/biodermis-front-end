import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders"



export const getTotalBalance = async () => {


    const headers = getHeaders();

    const req = await api.get('/saldodisp',{
        headers
    })
    

    return req.data;

}