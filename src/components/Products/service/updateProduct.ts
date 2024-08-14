import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";
import { ProductsType } from "./getProducts";




export const updateProduct = async (data:ProductsType,id:number,) => {

    const body = {
        "nome": data.nome,
        "descricao":data.descricao,
        "categoria_ids": data.categoria_ids,
        "valorvenda" :data.valorvenda,
        "valormin" :data.valormin,
        "valormax":data.valormax,
        "altura" :data.altura,
        "peso" :data.peso,
        "largura" : data.largura,
        "profundidade":data.profundidade,
      }
    
    const headers = getHeaders();

    try {
        
        const req = await api.patch(`/produtos/${id}`,body,{
            headers
        })
        return req.data

    } catch (e:any) {
        console.log(e);
        
        return e.message || e?.data.message
    }
}