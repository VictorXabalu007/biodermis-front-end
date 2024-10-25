import { PRODUCTS_DATA } from "../../../constants/sessionStorageKeys";
import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";


export const getProducts = async (id: number = 0) => {

      const headers = getHeaders();

      const req = await api.get(`/produtos/${id}`,{
        headers
      });

      sessionStorage.setItem(PRODUCTS_DATA, JSON.stringify(req));

      return req.data


}

export const getAllProducts = async (id: number = 0) => {

  
  const headers = getHeaders();
  const req = await api.get(`/produtos/${id}`,{
    headers
  });

  return req.data



}
