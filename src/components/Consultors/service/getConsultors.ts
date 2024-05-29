import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getToken"



export const getConsultors = async () => {

        const headers = getHeaders();


        const req = await api.get('/consultors/0',{
            headers,
        })

        return req.data;

}