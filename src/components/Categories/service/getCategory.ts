
import { CATEGORIES } from "../../../constants/paths/paths";
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

    if(req.data && Array.isArray(req.data)){
        sessionStorage.setItem(CATEGORIES, JSON.stringify(req.data));
    }

    return req.data


}

export const getCategoryNameById = (id:number) => {


    const categorys:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? '[]');

    const name = categorys.find(c => c.id === id);
    
    return name?.categoria;


}



