import { rankColumns, rankData } from "./rankData";
import { requestColumns, requestData } from "./requestsData";


export const items = [
    {

        columns: rankColumns,
        data: rankData,
        title: 'Rank de consultores',

    },

    {

        columns: requestColumns,
        data: requestData,
        title: 'Pedidos de saque',

    }
]

