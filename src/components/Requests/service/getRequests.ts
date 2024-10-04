

import { get } from "../../../service/connection";


export const getRequests = async () => {

      const req:Request[] = await get('/pedidos/0');
    

      return req;
    



}