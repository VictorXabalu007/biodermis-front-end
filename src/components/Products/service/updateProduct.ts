import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";


export const updateProduct = async (data:Product,id:number,) => {

    
    const body = {
        nome: data.nome,
        descricao:data.descricao,
        categoria_ids: data.categoria_ids,
        valorvenda :parseFloat(data.valorvenda),
        valormin :parseFloat(data.valormin),
        valormax:parseFloat(data.valormax),
        altura :data.altura,
        peso :data.peso,
        largura : data.largura,
        profundidade:data.profundidade,
      }
    
    const headers = getHeaders();

    try {
        
        const req = await api.patch(`/produtos/${id}`,body,{
            headers
        })
        return req

    } catch (e:any) {
        
        throw e?.response?.data?.error
     
    }
}