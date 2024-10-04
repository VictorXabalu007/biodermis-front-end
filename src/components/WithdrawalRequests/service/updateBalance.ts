import {  post } from "../../../service/connection"



export const updateBalance = async () => {


    const req = await post('/saldodisp',{})

    return req.data;

}