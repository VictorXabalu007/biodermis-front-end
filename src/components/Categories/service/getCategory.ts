

import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";



export type CategoryType = {
    categoria: string,
    id: number
}

export const getCategory = async () => {

    const headers = getHeaders();
    
    const req = await api.get<CategoryType[]>('/categorias',{
        headers,
    })

    return req.data


}

