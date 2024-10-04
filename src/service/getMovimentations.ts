
import {  get } from "./connection"


export const getMovimentations = async () => {


    const req:MovimentationType[] = await get('/movimentacoes');

    return req;

}