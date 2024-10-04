import { get } from "../../../service/connection";

export const getAddress = async () => {

    try {

        const req = await get(`/endereco/0`)
        return req

    } catch (e:any) {
        console.log('Erro ao pegar endereço do usuário: ', e); 
    }

}