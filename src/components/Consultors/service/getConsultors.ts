
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";




export const getConsultors = async () => {

        const headers = getHeaders();

        const req = await api.get('/consultores/0',{
            headers,
        })
       

        return req.data;

}