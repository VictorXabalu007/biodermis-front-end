import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";


export const getTotalBalance = async () => {

    const headers = getHeaders();
    try {

        const req = await api.get('/saldodisp',{
            headers
        })

        return req.data;

    } catch(e:any) {
        console.log('Erro ao pegar saldo disponível: ', e);
        
    }


}