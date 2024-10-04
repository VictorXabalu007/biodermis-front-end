import { PRODUCTS_DATA } from "../../../constants/sessionStorageKeys";
import { get } from "../../../service/connection";


export const getProducts = async (id: number = 0) => {

      const req:Product[] = await get(`/produtos/${id}`);

      sessionStorage.setItem(PRODUCTS_DATA, JSON.stringify(req));

      return req


}

export const getAllProducts = async (id: number = 0) => {

  const req:Product[] = await get(`/produtos/${id}`);

  return req



}
