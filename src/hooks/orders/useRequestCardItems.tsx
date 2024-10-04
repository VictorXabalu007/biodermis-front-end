import { useMemo } from "react"
import { colors } from "../../theme/colors";
import { useRequestsData } from "./useRequestsData";


export const useRequestCardItem = () => {

    const {
        getTotalPayments,
        getTotalApprovedPayments,
        getTotalPendingPayments,
        isLoading
    } = useRequestsData({enableFilterDate: false});



    const items = useMemo(()=> [

    {      
        key: '1',
        percent: getTotalPayments().percentualTotal,
        title: getTotalPayments().totalPayments,
        subText: 'Total de pagamentos',
        strokeColor: 
        {'0%': colors.primaryPurple,
        '50%': colors.primaryPurple,
        '100%': colors.primaryPurple}
    },
    {       
        key: '2',
        percent: getTotalApprovedPayments().percentualTotal,
        title: getTotalApprovedPayments().totalPayments,
        subText: 'Pagamentos aprovados',
        strokeColor: 
        {'0%': colors.brandGreen2,
        '50%': colors.brandGreen2,
        '100%': colors.brandGreen2}
    },
    {      
        key: '3',
        percent: getTotalPendingPayments().percentualTotal,
        title: getTotalPendingPayments().totalPayments,
        subText: 'Aguardando pagamento',
        strokeColor: 
        {'0%': colors.yellow,
        '50%': colors.yellow,
        '100%': colors.yellow}
    },


    ],[getTotalApprovedPayments, getTotalPendingPayments, getTotalPayments])

    return {
        items,
        isLoading,
    }



}