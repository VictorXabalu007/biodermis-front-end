
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";
import { WithDrawal } from "../util/withdrawalData";




export const getWithdraw = async () => {

    const headers = getHeaders();

    const req = await api.get<WithDrawal[]>('/saques/0',{
        headers,
    });


    return req.data;


}