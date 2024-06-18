
import { PRODUCTS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { isConsultor } from "../../../functions/Validators/ValidateConsultor/isConsultor";
import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";

export type ProductsType = {
  altura: string;
  categoria_id: number;
  descricao: string;
  estoque: number;
  id: number;
  imagens: string; 
  inativo: boolean;
  largura: string;
  mediaavs: string;
  nome: string;
  peso: string;
  profundidade: string;
  valormax: string;
  valormin: string;
  valorvenda: string;
  produto_id: number;
  valortotal:string,
  imagePath: any
};

export const getProducts = async (id: number = 0) => {

    const headers = getHeaders();
  
    if(isConsultor()){

      const req = await api.get<ProductsType[]>('/consultor/produtos', {
        headers
      });

      
      return req.data


    } else {

      const req = await api.get<ProductsType[]>(`/produtos/${id}`, {
        headers
      });

      
      sessionStorage.setItem(PRODUCTS_DATA, JSON.stringify(req.data));

      return req.data

    }
   

}

export const getAllProducts = async (id: number = 0) => {

  const headers = getHeaders();

  const req = await api.get<ProductsType[]>(`/produtos/${id}`, {
    headers
  });

  return req.data



}
