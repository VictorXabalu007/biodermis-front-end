import { InvoicingStatus } from "../@types/InvoicingStatus"


type InvoicingItems = {


    status:InvoicingStatus,
    subtitle: string,
    value:number,

}

export const invoicingItems:InvoicingItems[]  = [

    {

        status: 'pendente',
        subtitle: new Date().toLocaleDateString(),
        value: 50
    },
    {

        status: 'recebido',
        subtitle: new Date().toLocaleDateString(),
        value: 50
    },
    {

        status: 'pendente',
        subtitle: new Date().toLocaleDateString(),
        value: 50
    },
    {

        status: 'pendente',
        subtitle: new Date().toLocaleDateString(),
        value: 50
    },
    {

        status: 'pendente',
        subtitle: new Date().toLocaleDateString(),
        value: 50
    },

]