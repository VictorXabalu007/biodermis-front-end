import { get } from "../../../service/connection";


export const getTotalBalance = async () => {

    const req = await get('/saldodisp')

    return req;

}