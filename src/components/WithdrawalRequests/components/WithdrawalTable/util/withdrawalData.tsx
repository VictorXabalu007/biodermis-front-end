import { PaymentStatus } from "../@types/PaymentStatus";




export type DataType = {
    
    key: string,
    name: string,
    totalValueCurrent: number,
    avaliableWithdrawal: number,
    solicitedValue: number,
    paymentStatus: PaymentStatus;
}


export const withdrawalData: DataType[] = [

    {
        key: '1',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
        key: '2',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
        key: '3',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
        key: '4',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
        key: '5',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
        key: '6',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
        key: '7',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
        key: '8',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
        key: '9',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
        key: '10',
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },


]
