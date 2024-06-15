import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders"



export const updateBalance = async () => {

    const headers = getHeaders();

    const req = await api.post('/saldodisp',{},{
        headers
    })

    return req.data;

}