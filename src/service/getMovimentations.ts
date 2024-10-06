
import {  api } from "./connection"
import { getHeaders } from "./getHeaders";


export const getMovimentations = async () => {

    const headers= getHeaders();

    try {
        const req = await api.get('/movimentacoes',{
            headers
        });
    
        return req.data;

    } catch(e:any) {
        console.log('Erro ao pegar movimentações: ', e);
        
    }

}