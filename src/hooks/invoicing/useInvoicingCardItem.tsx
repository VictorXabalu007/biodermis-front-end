import { BsGraphUpArrow } from "react-icons/bs"
import { GoPackage } from "react-icons/go"
import { useProductsData } from "../products/useProductsData"
import { useMemo } from "react";
import { FilterDateConstraints } from "../../context/RangeDate/RangeDateContext";
import { useRequestsData } from "../orders/useRequestsData";



export const useInvoicingCardItem = ({ enableFilterDate = true }: FilterDateConstraints = {}) => {

    const {getGreatherSoldProduct, isLoading, getGreatherProductPercentualChange} = useProductsData();
    
    
    const {
        getTotalSells,
        getSellPercentualChange,
        getRequestOrderPercentChange,
        getSellStatusChange,
        getRequestOrderStatusChange,
        getTotalOrders
    } = useRequestsData({enableFilterDate});


    const items = useMemo(()=> [

        {
        
            icon:GoPackage,
            title: 'Vendas Totais',
            footerHeding: getTotalSells(),
            footerText: '(vendas)',
            percentual: getSellPercentualChange() + "%",
            status: getSellStatusChange()
    
        },
    
        {
    
            icon:GoPackage,
            title: 'Número de pedidos',
            footerHeding: getTotalOrders(),
            footerText: '(pedidos)',
            percentual: getRequestOrderPercentChange() + "%",
            status: getRequestOrderStatusChange()
    
        },
    
        {
    
            icon:BsGraphUpArrow ,
            title: 'Item mais vendido',
            footerHeding: getGreatherSoldProduct().mediaavs,
            footerText: getGreatherSoldProduct().nome || 'Não há nenhum item no momento',
            percentual: getGreatherProductPercentualChange() + "%",
            status: null
        },

    ],[getGreatherSoldProduct, getTotalSells]);

    return {
        items,
        isLoading
    }


}