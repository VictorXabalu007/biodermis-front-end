import { UserCredentials } from "../@types/UserData/UserData";
import { api } from "./connection";
import { getHeaders } from "./getHeaders";


export const updateUser = async (data:UserCredentials, id: number) => {

    const headers = getHeaders();

    const req = await api.patch(`/usuarios/${id}`,{...data},{
        headers
    })

    return req.data;

}