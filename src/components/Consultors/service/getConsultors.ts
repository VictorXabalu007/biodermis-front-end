import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";


export const getConsultors = async () => {

        try {
                
                const headers = getHeaders();
        
                const req = await api.get('/consultores/0',{
                        headers
                })
        
                return req.data;

        } catch (e:any) {
                console.log('Erro ao pegar consultores: ', e);
                
        }

}