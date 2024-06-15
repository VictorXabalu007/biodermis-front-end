import { api } from "./connection"
import { getHeaders } from "./getHeaders";



export const getMovimentations = async () => {
    

    const headers = getHeaders();

    const req = await api.get('/movimentacoes', {
        headers
    });
    

    return req.data;


}