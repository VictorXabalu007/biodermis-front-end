import { useMemo } from "react"
import { useRequestsData } from "./useRequestsData"
import { BRAND_PURPLE, GREEN_800, YEALLOW_700 } from "../../../constants/classnames/classnames";


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
        {'0%': BRAND_PURPLE,
        '50%': BRAND_PURPLE,
        '100%': BRAND_PURPLE}
    },
    {       
        key: '2',
        percent: getTotalApprovedPayments().percentualTotal,
        title: getTotalApprovedPayments().totalPayments,
        subText: 'Pagamentos aprovados',
        strokeColor: 
        {'0%': GREEN_800,
        '50%': GREEN_800,
        '100%': GREEN_800}
    },
    {      
        key: '3',
        percent: getTotalPendingPayments().percentualTotal,
        title: getTotalPendingPayments().totalPayments,
        subText: 'Aguardando pagamento',
        strokeColor: 
        {'0%': YEALLOW_700,
        '50%': YEALLOW_700,
        '100%': YEALLOW_700}
    },


    ],[getTotalApprovedPayments, getTotalPendingPayments, getTotalPayments])

    return {
        items,
        isLoading,
    }



}