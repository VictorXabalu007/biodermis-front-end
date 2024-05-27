
import { PaymentStatusType } from "../components/TableHeader/util/selectOptions";




export type WithDrawal = {
    
    id: number, 
    name: string,
    totalValueCurrent: number,
    avaliableWithdrawal: number,
    solicitedValue: number,
    paymentStatus: PaymentStatusType;
}


export const withdrawalData: WithDrawal[] = [

    {
        id: 0,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
        id: 1,
        name: 'Macucu',
        totalValueCurrent: 1400,
        avaliableWithdrawal: 1500,
        solicitedValue: 15000,
        paymentStatus: 'PENDING'

    },
    {
        id: 2,
        name: 'João Victor',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
        id: 3,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
        id: 4,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
        id: 5,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
        id: 6,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
        id: 7,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
        id: 8,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
        id: 9,
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },


]


