import { PaymentStatusType } from "../../TableHeader/util/selectOptions";




export type WithDrawal = {
    
  
    name: string,
    totalValueCurrent: number,
    avaliableWithdrawal: number,
    solicitedValue: number,
    paymentStatus: PaymentStatusType;
}


export const withdrawalData: WithDrawal[] = [

    {
      
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
        
        name: 'Macucu',
        totalValueCurrent: 1400,
        avaliableWithdrawal: 1500,
        solicitedValue: 15000,
        paymentStatus: 'PENDING'

    },
    {
       
        name: 'João Victor',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
     
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
 
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
   
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
 
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
  
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },
    {
    
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PENDING'

    },
    {
    
        name: 'Gustavo Henrique',
        totalValueCurrent: 1500,
        avaliableWithdrawal: 1500,
        solicitedValue: 1500,
        paymentStatus: 'PAID'

    },


]
