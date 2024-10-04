import { get } from "../../../service/connection";

export const getUsers = async () => {

    const req = await get('/usuarios/0');

    return req.data

}