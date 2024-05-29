import { api } from "../../../../service/connection"
import { getHeaders } from "../../../../service/getToken";



export const getRequests = async () => {

    const headers = getHeaders();

    const req = await api.get('/pedidos/0', {
        headers
      });
    
      return req.data;



}