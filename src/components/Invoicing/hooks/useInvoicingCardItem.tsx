import { BsGraphUpArrow } from "react-icons/bs"
import { GoPackage } from "react-icons/go"
import { useProductsData } from "../../Products/hooks/useProductsData"
import { useRequestsData } from "../../Requests/hooks/useRequestsData";
import { useMemo } from "react";
import { FilterDateConstraints } from "../../../context/RangeDate/RangeDateContext";



export const useInvoicingCardItem = ({ enableFilterDate = true }: FilterDateConstraints = {}) => {

    const {getGreatherSoldProduct, isLoading, getGreatherProductPercentualChange} = useProductsData();
    const {
        getTotalSells,
        getSellPercentualChange,
        getRequestOrderPercentChange
    } = useRequestsData({enableFilterDate});
    

    const items = useMemo(()=> [

        {
        
            icon:GoPackage,
            title: 'Vendas Totais',
            footerHeding: getTotalSells(),
            footerText: '(vendas)',
            percentual: getSellPercentualChange() + "%",
    
        },
    
        {
    
            icon:GoPackage,
            title: 'Número de pedidos',
            footerHeding: getTotalSells(),
            footerText: '(pedidos)',
            percentual: getRequestOrderPercentChange() + "%",
    
        },
    
        {
    
            icon:BsGraphUpArrow ,
            title: 'Item mais vendido',
            footerHeding: getGreatherSoldProduct().mediaavs,
            footerText: getGreatherSoldProduct().nome || 'Não há nenhum item no momento',
            percentual: getGreatherProductPercentualChange() + "%",
    
        },

    ],[getGreatherSoldProduct, getTotalSells]);

    return {
        items,
        isLoading
    }


}