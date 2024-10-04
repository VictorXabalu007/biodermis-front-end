
import { put } from "./connection";


export const updateUser = async (data:UserCredentials, id: number) => {

    const req = await put(`/usuarios/${id}`,{...data})

    const addressReq = await put(`/endereco/${data.id}`,{
        "rua": data.rua,
        "bairro": data.bairro,
        "complemento": data.numero,
        "numero": data.numero,
        "cep": data.cep,
        "cidade": data.cidade,
        "estado": data.estado,
    })

    return req.data && addressReq.data;

}