import { PaymentStatus } from "../@types/PaymentStatus";




export type WithDrawal = {
    
  
    name: string,
    totalValueCurrent: number,
    avaliableWithdrawal: number,
    solicitedValue: number,
    paymentStatus: PaymentStatus;
}


export const withdrawalData: WithDrawal[] = [

    {
      
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
        
        name: 'Macucu',
        totalValueCurrent: 1400,
        avaliableWithdrawal: 1500,
        solicitedValue: 15000,
        paymentStatus: 'efetuar'

    },
    {
       
        name: 'João Victor',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
     
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
 
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
   
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
 
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
  
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },
    {
    
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'efetuar'

    },
    {
    
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'pago'

    },


]
