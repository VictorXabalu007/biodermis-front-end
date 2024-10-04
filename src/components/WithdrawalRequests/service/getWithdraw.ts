import { get } from "../../../service/connection";



export const getWithdraw = async () => {


    const req:WithDrawal[] = await get('/saques/0');


    return req;


}