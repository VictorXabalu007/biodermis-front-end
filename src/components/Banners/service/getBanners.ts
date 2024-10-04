import { get } from "../../../service/connection"


export const getBanners = async () => {

    try {

        const res:Banner[] = await get('/carrossel/0')

        return res

    } catch(e){
        console.log('Erro ao pegar banners ', e);
    }

}