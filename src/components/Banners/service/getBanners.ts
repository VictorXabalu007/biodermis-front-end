import { api } from "../../../service/connection"


export const getBanners = async () => {

    
    try {

        const req = await api.get('/carrossel/0')

        return req.data

    } catch(e){

    }

}