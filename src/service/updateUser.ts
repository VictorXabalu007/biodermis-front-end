import { UserCredentials } from "../@types/UserData/UserData";
import { api } from "./connection";
import { getHeaders } from "./getHeaders";


export const updateUser = async (data:UserCredentials, id: number) => {

    const headers = getHeaders();

    const req = await api.patch(`/usuarios/${id}`,{...data},{
        headers
    })

    const addressReq = await api.patch(`/endereco/${data.id}`,{
        "rua": data.rua,
        "bairro": data.bairro,
        "complemento": data.numero,
        "numero": data.numero,
        "cep": data.cep,
        "cidade": data.cidade,
        "estado": data.estado,
    },{
        headers
    })

    return req.data && addressReq.data;

}