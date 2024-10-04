
import { get } from "../../../service/connection";


export const getCategory = async () => {

    const req:Category[] = await get('/categorias')

    return req


}

