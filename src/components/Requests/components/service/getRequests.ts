
import { api } from "../../../../service/connection"
import { getHeaders } from "../../../../service/getHeaders";
import { Requests } from "../@types/Requests";




export const getRequests = async () => {

      const headers = getHeaders();

      const req = await api.get<Requests[]>('/pedidos/0', {
        headers
      });
      

      return req.data;
    



}